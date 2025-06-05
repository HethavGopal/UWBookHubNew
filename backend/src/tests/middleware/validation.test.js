const { 
  validateCreateListing, 
  validateUserLogin, 
  validateListingQuery,
  schemas 
} = require('../../middleware/validation');

describe('Validation Middleware', () => {
  describe('validateCreateListing', () => {
    const validListing = {
      title: 'iPhone 14 Pro Max',
      description: 'Brand new iPhone 14 Pro Max in excellent condition',
      price: 1200,
      category: 'electronics',
      condition: 'new',
      email: 'test@uwaterloo.ca'
    };

    test('should pass validation with valid data', async () => {
      const req = { body: validListing };
      const res = global.testUtils.createMockResponse();
      const next = jest.fn();

      validateCreateListing(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('should fail validation with missing required fields', async () => {
      const req = { body: { title: 'Test' } };
      const res = global.testUtils.createMockResponse();
      const next = jest.fn();

      validateCreateListing(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Validation failed'
        })
      );
      expect(next).not.toHaveBeenCalled();
    });

    test('should fail validation with invalid category', async () => {
      const req = { 
        body: { 
          ...validListing, 
          category: 'invalid-category' 
        } 
      };
      const res = global.testUtils.createMockResponse();
      const next = jest.fn();

      validateCreateListing(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });

    test('should fail validation with negative price', async () => {
      const req = { 
        body: { 
          ...validListing, 
          price: -100 
        } 
      };
      const res = global.testUtils.createMockResponse();
      const next = jest.fn();

      validateCreateListing(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });

    test('should sanitize and trim string fields', async () => {
      const req = { 
        body: { 
          ...validListing, 
          title: '  iPhone 14 Pro Max  ',
          description: '  Brand new iPhone  '
        } 
      };
      const res = global.testUtils.createMockResponse();
      const next = jest.fn();

      validateCreateListing(req, res, next);

      expect(req.body.title).toBe('iPhone 14 Pro Max');
      expect(req.body.description).toBe('Brand new iPhone');
      expect(next).toHaveBeenCalled();
    });
  });

  describe('validateUserLogin', () => {
    test('should pass validation with valid credentials', async () => {
      const req = { 
        body: { 
          email: 'test@uwaterloo.ca', 
          password: 'password123' 
        } 
      };
      const res = global.testUtils.createMockResponse();
      const next = jest.fn();

      validateUserLogin(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('should fail validation with invalid email format', async () => {
      const req = { 
        body: { 
          email: 'invalid-email', 
          password: 'password123' 
        } 
      };
      const res = global.testUtils.createMockResponse();
      const next = jest.fn();

      validateUserLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });

    test('should fail validation with missing password', async () => {
      const req = { 
        body: { 
          email: 'test@uwaterloo.ca'
        } 
      };
      const res = global.testUtils.createMockResponse();
      const next = jest.fn();

      validateUserLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('validateListingQuery', () => {
    test('should pass validation with valid query parameters', async () => {
      const req = { 
        query: { 
          page: '1',
          limit: '10',
          category: 'electronics',
          sort: 'newest'
        } 
      };
      const res = global.testUtils.createMockResponse();
      const next = jest.fn();

      validateListingQuery(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.query.page).toBe(1); // Should be converted to number
      expect(req.query.limit).toBe(10); // Should be converted to number
    });

    test('should set default values for missing parameters', async () => {
      const req = { query: {} };
      const res = global.testUtils.createMockResponse();
      const next = jest.fn();

      validateListingQuery(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.query.page).toBe(1);
      expect(req.query.limit).toBe(10);
      expect(req.query.category).toBe('all');
      expect(req.query.sort).toBe('newest');
    });

    test('should fail validation with invalid sort option', async () => {
      const req = { 
        query: { 
          sort: 'invalid-sort' 
        } 
      };
      const res = global.testUtils.createMockResponse();
      const next = jest.fn();

      validateListingQuery(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });

    test('should fail validation with page number too high', async () => {
      const req = { 
        query: { 
          page: '9999' 
        } 
      };
      const res = global.testUtils.createMockResponse();
      const next = jest.fn();

      validateListingQuery(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Joi Schemas', () => {
    test('createListing schema should validate correctly', () => {
      const validData = {
        title: 'Test Item',
        description: 'Test description that is long enough',
        price: 50,
        category: 'electronics',
        condition: 'good',
        email: 'test@uwaterloo.ca'
      };

      const { error } = schemas.createListing.validate(validData);
      expect(error).toBeUndefined();
    });

    test('createListing schema should reject invalid data', () => {
      const invalidData = {
        title: 'A', // Too short
        price: -10, // Negative
        category: 'invalid',
        condition: 'broken'
      };

      const { error } = schemas.createListing.validate(invalidData);
      expect(error).toBeDefined();
      expect(error.details.length).toBeGreaterThan(0);
    });
  });
}); 