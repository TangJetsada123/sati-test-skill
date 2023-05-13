import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        console.log(signInDto)
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
}
