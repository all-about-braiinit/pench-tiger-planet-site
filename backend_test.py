#!/usr/bin/env python3
"""
Backend API Testing for Pench Tiger Planet
Tests all API endpoints with proper validation and error handling
"""

import requests
import json
import sys
from datetime import datetime, timedelta

# Base URL from environment
BASE_URL = "https://tiger-reserve-next.preview.emergentagent.com/api"

def test_health_check():
    """Test GET /api - Health check endpoint"""
    print("\n=== Testing Health Check (GET /api) ===")
    try:
        response = requests.get(BASE_URL, timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'healthy':
                print("✅ Health check PASSED")
                return True
            else:
                print("❌ Health check FAILED - status not healthy")
                return False
        else:
            print(f"❌ Health check FAILED - Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health check FAILED - Exception: {e}")
        return False

def test_booking_valid():
    """Test POST /api/booking with valid data"""
    print("\n=== Testing Booking Submission (POST /api/booking) - Valid Data ===")
    
    # Calculate future dates
    check_in = (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")
    check_out = (datetime.now() + timedelta(days=33)).strftime("%Y-%m-%d")
    
    booking_data = {
        "name": "Rahul Sharma",
        "email": "rahul@test.com",
        "phone": "9876543210",
        "checkIn": check_in,
        "checkOut": check_out,
        "roomType": "garden-view",
        "adults": "2",
        "children": "1",
        "specialRequests": "Early morning safari pickup"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/booking", 
                               json=booking_data, 
                               headers={'Content-Type': 'application/json'},
                               timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('bookingId'):
                print("✅ Booking submission PASSED")
                return True, data.get('bookingId')
            else:
                print("❌ Booking submission FAILED - Missing success or bookingId")
                return False, None
        else:
            print(f"❌ Booking submission FAILED - Expected 200, got {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ Booking submission FAILED - Exception: {e}")
        return False, None

def test_booking_invalid():
    """Test POST /api/booking with missing required fields"""
    print("\n=== Testing Booking Validation (POST /api/booking) - Missing Fields ===")
    
    # Missing required fields (name, email, phone, checkIn, checkOut)
    invalid_data = {
        "name": "Test User",
        "email": "test@example.com"
        # Missing phone, checkIn, checkOut
    }
    
    try:
        response = requests.post(f"{BASE_URL}/booking", 
                               json=invalid_data, 
                               headers={'Content-Type': 'application/json'},
                               timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data:
                print("✅ Booking validation PASSED - Correctly rejected invalid data")
                return True
            else:
                print("❌ Booking validation FAILED - No error message in response")
                return False
        else:
            print(f"❌ Booking validation FAILED - Expected 400, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Booking validation FAILED - Exception: {e}")
        return False

def test_contact_valid():
    """Test POST /api/contact with valid data"""
    print("\n=== Testing Contact Submission (POST /api/contact) - Valid Data ===")
    
    contact_data = {
        "name": "Priya Sharma",
        "email": "priya@test.com",
        "phone": "9876543211",
        "subject": "Safari Query",
        "message": "Can you arrange jungle safari?"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", 
                               json=contact_data, 
                               headers={'Content-Type': 'application/json'},
                               timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('contactId'):
                print("✅ Contact submission PASSED")
                return True, data.get('contactId')
            else:
                print("❌ Contact submission FAILED - Missing success or contactId")
                return False, None
        else:
            print(f"❌ Contact submission FAILED - Expected 200, got {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ Contact submission FAILED - Exception: {e}")
        return False, None

def test_contact_invalid():
    """Test POST /api/contact with missing required fields"""
    print("\n=== Testing Contact Validation (POST /api/contact) - Missing Fields ===")
    
    # Missing required fields (name, email, message)
    invalid_data = {
        "name": "Test User"
        # Missing email and message
    }
    
    try:
        response = requests.post(f"{BASE_URL}/contact", 
                               json=invalid_data, 
                               headers={'Content-Type': 'application/json'},
                               timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data:
                print("✅ Contact validation PASSED - Correctly rejected invalid data")
                return True
            else:
                print("❌ Contact validation FAILED - No error message in response")
                return False
        else:
            print(f"❌ Contact validation FAILED - Expected 400, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Contact validation FAILED - Exception: {e}")
        return False

def test_get_bookings():
    """Test GET /api/bookings - List all bookings"""
    print("\n=== Testing Get Bookings (GET /api/bookings) ===")
    
    try:
        response = requests.get(f"{BASE_URL}/bookings", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: Found {len(data)} bookings")
            if len(data) > 0:
                print(f"Sample booking: {data[0]}")
            
            if isinstance(data, list):
                print("✅ Get bookings PASSED")
                return True
            else:
                print("❌ Get bookings FAILED - Response is not an array")
                return False
        else:
            print(f"❌ Get bookings FAILED - Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Get bookings FAILED - Exception: {e}")
        return False

def test_get_contacts():
    """Test GET /api/contacts - List all contacts"""
    print("\n=== Testing Get Contacts (GET /api/contacts) ===")
    
    try:
        response = requests.get(f"{BASE_URL}/contacts", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: Found {len(data)} contacts")
            if len(data) > 0:
                print(f"Sample contact: {data[0]}")
            
            if isinstance(data, list):
                print("✅ Get contacts PASSED")
                return True
            else:
                print("❌ Get contacts FAILED - Response is not an array")
                return False
        else:
            print(f"❌ Get contacts FAILED - Expected 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Get contacts FAILED - Exception: {e}")
        return False

def main():
    """Run all backend API tests"""
    print("🚀 Starting Pench Tiger Planet Backend API Tests")
    print(f"Testing against: {BASE_URL}")
    
    results = []
    
    # Test all endpoints
    results.append(("Health Check", test_health_check()))
    results.append(("Booking Valid", test_booking_valid()[0]))
    results.append(("Booking Validation", test_booking_invalid()))
    results.append(("Contact Valid", test_contact_valid()[0]))
    results.append(("Contact Validation", test_contact_invalid()))
    results.append(("Get Bookings", test_get_bookings()))
    results.append(("Get Contacts", test_get_contacts()))
    
    # Summary
    print("\n" + "="*60)
    print("📊 TEST SUMMARY")
    print("="*60)
    
    passed = 0
    failed = 0
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name:<25} {status}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal: {passed + failed} tests")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 All tests PASSED!")
        return 0
    else:
        print(f"\n⚠️  {failed} test(s) FAILED!")
        return 1

if __name__ == "__main__":
    sys.exit(main())