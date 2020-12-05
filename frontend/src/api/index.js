import ApiClient                            from './ApiClient';
import Session                              from './Session';
import User                                 from './User';
import UserProfile                          from './UserProfile';
import UserConfirmationCode                 from './UserConfirmationCode';
import Role                                 from './Role';
import Package                              from './Package';
import Config                               from './Config';
import Company                              from './Company';
import File                                 from './File';
import Investor                             from './Investor';
import InvestorStatus                       from './InvestorStatus';
import InvestorBalanceOperation             from './InvestorBalanceOperation';
import InvestorBalanceOperationStatus       from './InvestorBalanceOperationStatus';
import InvestorCommissionContract           from './InvestorCommissionContract';
import LoanContract                         from './LoanContract';
import SaleContract                         from './SaleContract';
import SaleContractFile                     from './SaleContractFile';
import SaleContractStatus                   from './SaleContractStatus';
import CommissionContract                   from './CommissionContract';
import CommissionContractFile               from './CommissionContractFile';
import Commissioner                         from './Commissioner';
import CommissionerBalanceOperation         from './CommissionerBalanceOperation';
import CommissionerBalanceOperationStatus   from './CommissionerBalanceOperationStatus';
import CommissionerCommissionContract       from './CommissionerCommissionContract';
import CommissionerSaleContract             from './CommissionerSaleContract';
import Calendar                             from './Calendar';
import RegistryReport                       from './RegistryReport';
import RegistryReportFile                   from './RegistryReportFile';

export default function ({ apiPrefix } = {}) {
    if (!apiPrefix) {
        throw new Error('API prefix required');
    }

    const apiClient = new ApiClient({
        prefix : apiPrefix
    });

    return {
        apiClient,
        session                             : new Session({ apiClient }),
        user                                : new User({ apiClient }),
        userProfile                         : new UserProfile({ apiClient }),
        userConfirmationCode                : new UserConfirmationCode({ apiClient }),
        role                                : new Role({ apiClient }),
        package                             : new Package({ apiClient }),
        config                              : new Config({ apiClient }),
        company                             : new Company({ apiClient }),
        file                                : new File({ apiClient }),
        investor                            : new Investor({ apiClient }),
        investorStatus                      : new InvestorStatus({ apiClient }),
        investorBalanceOperation            : new InvestorBalanceOperation({ apiClient }),
        investorBalanceOperationStatus      : new InvestorBalanceOperationStatus({ apiClient }),
        investorCommissionContract          : new InvestorCommissionContract({ apiClient }),
        loanContract                        : new LoanContract({ apiClient }),
        saleContract                        : new SaleContract({ apiClient }),
        saleContractFile                    : new SaleContractFile({ apiClient }),
        saleContractStatus                  : new SaleContractStatus({ apiClient }),
        commissionContract                  : new CommissionContract({ apiClient }),
        commissionContractFile              : new CommissionContractFile({ apiClient }),
        commissioner                        : new Commissioner({ apiClient }),
        commissionerBalanceOperation        : new CommissionerBalanceOperation({ apiClient }),
        commissionerBalanceOperationStatus  : new CommissionerBalanceOperationStatus({ apiClient }),
        commissionerCommissionContract      : new CommissionerCommissionContract({ apiClient }),
        commissionerSaleContract            : new CommissionerSaleContract({ apiClient }),
        calendar                            : new Calendar({ apiClient }),
        registryReport                      : new RegistryReport({ apiClient }),
        registryReportFile                  : new RegistryReportFile({ apiClient })
    };
}
