import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME || 'pench_tiger_planet')
  }
  return db
}

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    // Health check
    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'Pench Tiger Planet API', status: 'healthy' }))
    }

    // ── POST /api/booking ────────────────────────────────────────────────
    if (route === '/booking' && method === 'POST') {
      const body = await request.json()
      const { name, email, phone, checkIn, checkOut, roomType, adults, children, specialRequests } = body

      if (!name || !email || !phone || !checkIn || !checkOut) {
        return handleCORS(NextResponse.json(
          { error: 'Name, email, phone, check-in and check-out dates are required.' },
          { status: 400 }
        ))
      }

      const booking = {
        bookingId: uuidv4(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        checkIn,
        checkOut,
        roomType: roomType || 'no-preference',
        adults: parseInt(adults) || 2,
        children: parseInt(children) || 0,
        specialRequests: specialRequests || '',
        status: 'pending',
        createdAt: new Date(),
      }

      await db.collection('bookings').insertOne(booking)

      return handleCORS(NextResponse.json({
        success: true,
        message: 'Booking inquiry submitted successfully. We will contact you within 2 hours.',
        bookingId: booking.bookingId,
      }))
    }

    // ── GET /api/bookings ────────────────────────────────────────────────
    if (route === '/bookings' && method === 'GET') {
      const bookings = await db.collection('bookings')
        .find({})
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray()
      const cleaned = bookings.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleaned))
    }

    // ── POST /api/contact ────────────────────────────────────────────────
    if (route === '/contact' && method === 'POST') {
      const body = await request.json()
      const { name, email, phone, subject, message } = body

      if (!name || !email || !message) {
        return handleCORS(NextResponse.json(
          { error: 'Name, email, and message are required.' },
          { status: 400 }
        ))
      }

      const contact = {
        contactId: uuidv4(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || '',
        subject: subject?.trim() || 'General Inquiry',
        message: message.trim(),
        status: 'unread',
        createdAt: new Date(),
      }

      await db.collection('contacts').insertOne(contact)

      return handleCORS(NextResponse.json({
        success: true,
        message: 'Your message has been received. We will respond within 24 hours.',
        contactId: contact.contactId,
      }))
    }

    // ── GET /api/contacts ────────────────────────────────────────────────
    if (route === '/contacts' && method === 'GET') {
      const contacts = await db.collection('contacts')
        .find({})
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray()
      const cleaned = contacts.map(({ _id, ...rest }) => rest)
      return handleCORS(NextResponse.json(cleaned))
    }

    // Legacy status endpoints
    if (route === '/status' && method === 'POST') {
      const body = await request.json()
      if (!body.client_name) {
        return handleCORS(NextResponse.json({ error: 'client_name is required' }, { status: 400 }))
      }
      const statusObj = { id: uuidv4(), client_name: body.client_name, timestamp: new Date() }
      await db.collection('status_checks').insertOne(statusObj)
      return handleCORS(NextResponse.json(statusObj))
    }

    if (route === '/status' && method === 'GET') {
      const statusChecks = await db.collection('status_checks').find({}).limit(1000).toArray()
      return handleCORS(NextResponse.json(statusChecks.map(({ _id, ...rest }) => rest)))
    }

    return handleCORS(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }))
  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json({ error: 'Internal server error' }, { status: 500 }))
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
