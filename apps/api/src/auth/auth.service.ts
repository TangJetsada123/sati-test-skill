import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async signIn(email, pass) {
        const user = await this.userService.findOne(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
}
}
