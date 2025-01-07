import React from 'react'
import { Suspense } from 'react'
import {
  BrowserRouter,
  Outlet,
  Routes as RoutesWrapper,
  Route,
} from 'react-router-dom'
import Public from './public'
import Private from './private'
import Login from '../containers/auth/login'
import ForgotPassword from '../containers/auth/forgot-password'
import AppTemplate from '../containers/app-template'
import Dashboard from '../components/dashboard'
import AuthTemplate from '../containers/auth-template'
import UserManagement from '../components/user-management'
import Currencies from '../components/currencies'
import PaymentCategories from '../components/payment-categories'
import UserReceipts from '../components/user-receipts'
import FeeManagement from '../components/fee-management'
import FXExchangeManagement from '../components/fx-exchange-management'
import TransferList from '../components/transfer-list'
import ServiceFees from '../components/service-fees'
import CountryLanguage from '../components/country-language'
import EmailTemplateManagement from '../components/email-template'
import SmsTemplateManagement from '../components/sms-template'
import TermsAndConditions from '../components/terms-and-conditions'
import KYBTerms from '../components/kyb-terms'

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <RoutesWrapper>
          <Route
            path="/"
            element={
              <Public>
                <AuthTemplate>
                  <Outlet />
                </AuthTemplate>
              </Public>
            }
          >
            <Route index element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route
            element={
              <Private>
                <AppTemplate>
                  <Outlet />
                </AppTemplate>
              </Private>
            }
          >
            <Route exact path="dashboard" element={<Dashboard />} />
            <Route exact path="user-management" element={<UserManagement />} />
            <Route exact path="currencies" element={<Currencies />} />
            <Route
              exact
              path="payment-categories"
              element={<PaymentCategories />}
            />
            <Route exact path="user-receipts" element={<UserReceipts />} />
            <Route exact path="fee-management" element={<FeeManagement />} />
            <Route
              exact
              path="fx-exchange-management"
              element={<FXExchangeManagement />}
            />
            <Route exact path="transfer-list" element={<TransferList />} />
            <Route exact path="service-fees" element={<ServiceFees />} />
            <Route
              exact
              path="country-language"
              element={<CountryLanguage />}
            />
            <Route
              exact
              path="email-template-management"
              element={<EmailTemplateManagement />}
            />
            <Route
              exact
              path="sms-template-management"
              element={<SmsTemplateManagement />}
            />
            <Route exact path="kyb-terms" element={<KYBTerms />} />
            <Route
              exact
              path="terms-and-conditions"
              element={<TermsAndConditions />}
            />
          </Route>
        </RoutesWrapper>
      </BrowserRouter>
    </Suspense>
  )
}

export default Routes
