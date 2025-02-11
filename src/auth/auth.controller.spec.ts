import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LogInDto, SignUpUserDto } from './dto/body-auth.dto';
import { HttpException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let jwtService: JwtService;

  const mockJWTService = {
    provide: JwtService,
    useValue: { signAsync: jest.fn().mockResolvedValue('mocked_jwt_token'), },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, mockJWTService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signUp', () => {
    it('should sign up successfully', async () => {
      const userToBeCreated: SignUpUserDto = { email: 'testUser@example.com', password: 'testPass@Word', role_id: 1, given_name: 'test', last_name: 'user' };
      const result = await authController.signUp(userToBeCreated);

      jest.spyOn(authService, 'createUser')
      jest.spyOn(authService, 'getOneByEmail')

      expect(result).toHaveProperty('email', "testUser@example.com");
      expect(result).toHaveProperty('given_name', "test");
      expect(result).toHaveProperty('last_name', "user");
    });

    it('should throw an error if user already exists', async () => {
      const userToBeCreated: SignUpUserDto = { email: 'testUser@example.com', password: 'testPass@Word', role_id: 1, given_name: 'test', last_name: 'user' };
      const result = authController.signUp(userToBeCreated);

      await expect(result).rejects.toThrow(HttpException);
    });
  });

  describe('logIn', () => {

    it('should log in successfully', async () => {
      const userCredentials: LogInDto = { email: 'testUser@example.com', password: 'testPass@Word' }

      jest.spyOn(console, 'log');

      const result = await authController.logIn(userCredentials);

      expect(result).toHaveProperty('email', "testUser@example.com");
      expect(result).toHaveProperty('given_name', "test");
      expect(result).toHaveProperty('last_name', "user");
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('zoho_access_token');
    });

    it('should throw an error for incorrect email', async () => {
      const userCredentials: LogInDto = { email: 'test@example.com', password: 'John@Doe5' };
      jest.spyOn(authService, 'getOneByEmail').mockResolvedValue(null);
      await expect(authController.logIn(userCredentials)).rejects.toThrow(HttpException);
    });

    it('should throw an error for incorrect password', async () => {
      const userCredentials: LogInDto = { email: 'example@gmail.com', password: 'password' };
      jest.spyOn(authService, 'getOneByEmail').mockResolvedValue(null);
      await expect(authController.logIn(userCredentials)).rejects.toThrow(HttpException);
    });

  });

});