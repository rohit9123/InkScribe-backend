import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { IsLoginMiddleware } from './commom/middleware/isLogin';


@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(IsLoginMiddleware)
//       .forRoutes('user/signin');
//   }
// }
