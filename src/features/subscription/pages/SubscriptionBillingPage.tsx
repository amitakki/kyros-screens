'use client';

import { useState } from 'react';

import { AppHeader } from '../../../shared/components/app-shell/AppHeader';
import { PageContainer } from '../../../shared/components/layout/PageContainer';
import { SectionHeader } from '../../../shared/components/layout/SectionHeader';
import { useIsMobile } from '../../../shared/hooks/useIsMobile';
import { ROUTES } from '../../../shared/constants/routes';
import { SubscriptionAvailablePlansCard } from '../components/SubscriptionAvailablePlansCard';
import { SubscriptionBillingHistoryCard } from '../components/SubscriptionBillingHistoryCard';
import { SubscriptionCancelModal } from '../components/SubscriptionCancelModal';
import { SubscriptionPaymentMethodCard } from '../components/SubscriptionPaymentMethodCard';
import { SubscriptionPlanStateSection } from '../components/SubscriptionPlanStateSection';
import { SubscriptionStateSwitcher } from '../components/SubscriptionStateSwitcher';
import { SubscriptionSupportFooter } from '../components/SubscriptionSupportFooter';
import { subscriptionBillingContent } from '../content';
import type { PlanState as SubscriptionPlanState } from '../types';

export function SubscriptionBilling() {
  const [planState, setPlanState] = useState<SubscriptionPlanState>('active');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-surface-subtle font-sans">
      <AppHeader activePath={ROUTES.billing} />

      <PageContainer
        as="main"
        className={`max-w-[1184px] pb-20 ${isMobile ? 'pt-6' : 'pt-10'}`}
      >
        <SectionHeader
          className="mb-8"
          description={subscriptionBillingContent.description}
          title={subscriptionBillingContent.title}
        />

        <SubscriptionStateSwitcher
          state={planState}
          onChange={setPlanState}
        />

        {isMobile ? (
          <div>
            <SubscriptionPlanStateSection
              planState={planState}
              onCancel={() => setShowCancelModal(true)}
            />
            <SubscriptionPaymentMethodCard noCard={planState === 'trial'} />
            <SubscriptionAvailablePlansCard current="annual" />
            <SubscriptionBillingHistoryCard />
            <SubscriptionSupportFooter />
          </div>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div>
              <SubscriptionPlanStateSection
                planState={planState}
                onCancel={() => setShowCancelModal(true)}
              />
              <SubscriptionAvailablePlansCard current="annual" />
              <SubscriptionBillingHistoryCard />
            </div>

            <div>
              <SubscriptionPaymentMethodCard noCard={planState === 'trial'} />
              <SubscriptionSupportFooter />
            </div>
          </div>
        )}
      </PageContainer>

      {showCancelModal ? (
        <SubscriptionCancelModal
          onClose={() => setShowCancelModal(false)}
        />
      ) : null}
    </div>
  );
}
