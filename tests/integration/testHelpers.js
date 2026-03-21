// Chia Jia Ye A0286580U
// Test user data
export const testUsers = {
  validUser: {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'Password@123',
    password_confirm: 'Password@123',
    phone: '1234567890',
    address: '123 Test St',
    question: 'What is your favorite color?',
    answer: 'blue',
  },
  validUser2: {
    name: 'Second Test User',
    email: 'seconduser@example.com',
    password: 'SecondPass@123',
    password_confirm: 'SecondPass@123',
    phone: '9876543210',
    address: '456 Test Ave',
    question: 'What is your pet name?',
    answer: 'fluffy',
  },
  existingUser: {
    name: 'Existing User',
    email: 'existing@example.com',
    password: 'ExistingPass@123',
    password_confirm: 'ExistingPass@123',
    phone: '5555555555',
    address: '789 Existing Lane',
    question: 'Favorite sport?',
    answer: 'soccer',
  },
};

// Helper to create a registered user
export const createTestUser = async (request, userData = testUsers.validUser) => {
  const response = await request
    .post('/api/v1/auth/register')
    .send(userData);
  
  return {
    user: response.body.user,
    token: response.body.token,
    response,
  };
};

// Helper to login a user
export const loginTestUser = async (request, email, password) => {
  const response = await request
    .post('/api/v1/auth/login')
    .send({ email, password });
  
  return {
    user: response.body.user,
    token: response.body.token,
    response,
  };
};