'use server';

import { redirect } from 'next/navigation';
import { withTeam } from '@/lib/auth/middleware';
import { updateTeamSubscription } from '@/lib/db/queries';

// Demo mode: Skip Stripe, directly activate subscription
export const checkoutAction = withTeam(async (formData, team) => {
  const priceId = formData.get('priceId') as string;
  
  // Determine plan based on priceId (or default to Plus)
  const planName = priceId?.includes('plus') ? 'Plus' : 'Base';
  
  // Directly activate subscription without Stripe
  await updateTeamSubscription(team.id, {
    stripeSubscriptionId: `demo_sub_${Date.now()}`,
    stripeProductId: `demo_prod_${planName.toLowerCase()}`,
    planName: planName,
    subscriptionStatus: 'active'
  });
  
  redirect('/dashboard?activated=true');
});

// Demo mode: Just redirect to dashboard (no portal needed)
export const customerPortalAction = withTeam(async (_, team) => {
  redirect('/dashboard');
});
