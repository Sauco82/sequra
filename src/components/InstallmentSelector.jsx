import { useGetCreditAgreementQuery, usePostEventsMutation } from "../api/api";

export default function InstallmentSelector({amount}){
  const {data, isLoading} = useGetCreditAgreementQuery(100),
        [ postEvents, result ] = usePostEventsMutation({"context": "checkoutWidget", "type": "simulatorInstalmentChanged", "selectedInstalment": 12});

  console.log(result);

  return (
    <>
      <h1>hey</h1>
      <button onClick={postEvents}>test</button>
    </>
  );
}