import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com'; // Sample API

test.describe('Crowdstrike API Tests', () => {

  // --- GET Request ---
  test('GET /posts should return 200 and 100 posts', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
    
    // Assert status code
    expect(response.status()).toBe(200);
    
    // Assert response body
    const posts = await response.json();
    console.log('the output of the post body' + JSON.stringify(posts)); // Log the posts for debugging
    expect(posts.length).toBe(100); // Verify number of posts
    expect(posts[0]).toHaveProperty('userId'); // Check structure
  });

  // --- POST Request ---
  test('POST /posts should create a new post', async ({ request }) => {
    const newPost = {
      title: 'Crowdstrike Playwright API Test',
      body: 'This is a Crowdstrike test post.',
      userId: 1,
    };

    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPost,
      headers: { 'Content-type': 'application/json' },
    });

    expect(response.status()).toBe(201);
    
    const createdPost = await response.json();
    console.log('the output of the post body' + JSON.stringify(createdPost)); // Log the created post for debugging
    expect(createdPost).toHaveProperty('id'); // Check for auto-generated ID
    expect(createdPost).toMatchObject(newPost); // Verify response matches request
    expect(createdPost.title).toBe(newPost.title); // Check title
    expect(createdPost.id).toBeDefined(); // Check auto-generated ID
  });

  // --- Authentication Test ---
  test('GET /protected should fail without auth', async ({ request }) => {
    const response = await request.get(`https://httpbin.org/basic-auth/user/pass`, {
      // No credentials provided
    });
    console.log('the status code from the response body: ' + JSON.stringify(response.status())); // Log the response for debugging
    expect(response.status()).toBe(401);
  });

  test('GET /protected should pass with auth', async ({ request }) => {
    const response = await request.get(`https://httpbin.org/basic-auth/user/pass`, {
      headers: { 'Authorization': 'Basic dXNlcjpwYXNz' }, // Base64 encoded "user:pass"
    });
    console.log('the status code from the response body: ' + JSON.stringify(response.status())); // Log the response for debugging
    expect(response.status()).toBe(200);
  });

  // --- Response Schema Validation ---
  test('GET /posts/1 should match schema', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);
    const post = await response.json();

    // Validate JSON schema
    expect(post).toEqual({
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });
});