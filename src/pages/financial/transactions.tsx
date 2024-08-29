import { useLayout } from "layout";
import AuthLayout from "layout/AuthLayout";
import { useEffect, useState } from "react";
import API from "utils/API";
import TransactionsTable from "components/Financial/Transactions/Table";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { user, translate } = useLayout();

  const _fetchData = () => {
    API.get(
      "/api/transactions",
      {},
      (data) => {
        setTransactions(data?.data);
      },
      (e) => { },
      {
        Authorization: `Bearer ${user?.access_token}`,
      }
    );
  };
  useEffect(() => {
    _fetchData();
  }, []);
  useEffect(() => {
    // console.log(open, "open");
  }, [open]);

  return (
    <AuthLayout title={translate("transactions")}>
      <TransactionsTable transactions={transactions} />
    </AuthLayout>
  );
};
export default Transactions;
