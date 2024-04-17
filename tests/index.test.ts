// tests/inRange.test.ts
import "reflect-metadata";
import { User } from './models/user';
import { describe, it, expect, beforeAll } from 'vitest';
import { Validator } from '../src/core/validator';


describe('email Validation', () => {
  const user = new User();

  it('email validation should pass', () => {
    
      user.email = 'validemail@example.com';
      const errors = Validator.validate(user);
      expect(errors).toBeNull(); // Expect no errors for valid email
    });
  
    it('email validation should fail', () => {
      user.email = 'invalidemail';
      const errors = Validator.validate(user);
      expect(errors).not.toBeNull(); // Expect errors for invalid email
      if(errors){
          expect(errors[0].property).toBe('email');
          expect(errors[0].constraints[Object.getOwnPropertyNames(errors[0].constraints)[0]] as string).toContain('the property must be an email');
      }
  })

});