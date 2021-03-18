import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export const useTransactions = () => useContext(TransactionsContext)