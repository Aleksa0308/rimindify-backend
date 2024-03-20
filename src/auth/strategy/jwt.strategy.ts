import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: config.get('JWT_SECRET')
        });
    }

    async validate(payload: {sub: number, email: string}) {
        const user = await this.prisma.user.findUnique({
            where: {
                userId: payload.sub
            }
        });
        if (!user) throw new UnauthorizedException();

        delete user.password;
        return user;
    }
}