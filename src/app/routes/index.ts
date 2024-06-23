import express from 'express';
import { ManageRoutes } from '../modules/manage-web/manage.routes';
import { SubscriptionPlanRoutes } from '../modules/subscriptions-plan/subscriptions-plan.routes';
import { ReviewRoutes } from '../modules/reviews/reviews.routes';
import { subscribeRoutes } from '../modules/subscribe/subscribe.routes';
import { FeedbackRoutes } from '../modules/feedback/feedback.routes';
import { SubscriptionRoutes } from '../modules/subscriptions/subscriptions.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { PaymentRoutes } from '../modules/payment/payment.routes';
import { ProductRoutes } from '../modules/products/products.routes';
import { ClassRoutes } from '../modules/class/class.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { CartRoutes } from '../modules/cart/cart.routes';
import { OrderRoutes } from '../modules/orders/orders.routes';
import { ProgramRoutes } from '../modules/program/program.routes';
import { SeriesRoutes } from '../modules/series/series.routes';
import { DashboardRoutes } from '../modules/dashboard/dashboard.routes';
import { CommentRoutes } from '../modules/comments/comments.routes';
import { BannerRoutes } from '../modules/banner/banner.routes';
import { NotificationRoutes } from '../modules/notifications/notifications.routes';
import { LogoRoutes } from '../modules/logo/logo.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  {
    path: '/manage',
    route: ManageRoutes,
  },

  {
    path: '/subscription-plan',
    route: SubscriptionPlanRoutes,
  },
  {
    path: '/subscriptions',
    route: SubscriptionRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/subscribe',
    route: subscribeRoutes,
  },
  {
    path: '/feedback',
    route: FeedbackRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/program',
    route: ProgramRoutes,
  },
  {
    path: '/series',
    route: SeriesRoutes,
  },
  {
    path: '/class',
    route: ClassRoutes,
  },
  {
    path: '/comment',
    route: CommentRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
  {
    path: '/cart',
    route: CartRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/dashboard',
    route: DashboardRoutes,
  },
  {
    path: '/banner',
    route: BannerRoutes,
  },
  {
    path: '/logo',
    route: LogoRoutes,
  },
  {
    path: '/notification',
    route: NotificationRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
