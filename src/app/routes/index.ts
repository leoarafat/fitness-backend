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
    path: '/class',
    route: ClassRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
