import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto, SignUpUserDto } from './dto/body-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Public } from './decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseLoginDto } from './dto/response-user.dto';
import { clientDto } from 'src/client/dto/create-client.dto';


@Controller({ path: 'auth', version: '1' })
@Public()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) { }

  @Post('logIn')
  @ApiResponse({ status: 201, description: 'User logged in successfully', type: ResponseLoginDto })
  async logIn(@Body() userCredentials: LogInDto) {
    const user = await this.authService.checkLoginUserCredentials(userCredentials.email, userCredentials.password);
    const access_token = await this.jwtService.signAsync({ id: user.id, email: user.email });
    return { ...user, token: access_token };
  }

  @Post('signUp')
  @ApiResponse({ status: 201, description: 'User signed up successfully', type: clientDto })
  async signUp(@Body() userToBeCreated: SignUpUserDto) {
    return await this.authService.createNewUser(userToBeCreated);;
  }

}

