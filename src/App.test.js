import { render, screen, waitFor } from "./test-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";

import App from "./App";

const installments = [
  {"instalment_count": 3,"total_with_tax": {"value": 1000,"string": "10 €"},"instalment_amount": {"value": 333,"string": "3,33 €"},"instalment_fee": {"value": 500,"string": "5 €"},"instalment_total": {"value": 833,"string": "8,33 €"},"grand_total": {"value": 2500,"string": "25 €"},"cost_of_credit": {"value": 1500,"string": "15 €"},"cost_of_credit_pct": {"value": 600,"string": "6,00 %"},"apr": {"value": 2500,"string": "25 %"},"max_financed_amount": {"value": 200000,"string": "2000 €"}},
  {"instalment_count": 6,"total_with_tax": {"value": 1000,"string": "10 €"},"instalment_amount": {"value": 166,"string": "1,66 €"},"instalment_fee": {"value": 500,"string": "5 €"},"instalment_total": {"value": 666,"string": "6,66 €"},"grand_total": {"value": 4000,"string": "40 €"},"cost_of_credit": {"value": 3000,"string": "30 €"},"cost_of_credit_pct": {"value": 600,"string": "6,00 %"},"apr": {"value": 2500,"string": "25 %"},"max_financed_amount": {"value": 200000,"string": "2000 €"}}
];

const AMOUNT = 100;

const handlers = [
  rest.get("http://localhost:8080/credit_agreements?totalWithTax=*", (req, res, ctx)=>{
    return res(ctx.json(installments));
  }),
  rest.post("http://localhost:8080/events", (req, res, ctx) => {
    return res(ctx.json({}));
  })
];

const server = setupServer(...handlers);

describe("Sequra App", () => {
  beforeAll(()=>server.listen());
  afterEach(()=>server.resetHandlers());
  afterAll(()=>server.close());

  it("loads and displays initial data", async ()=>{
    render(<App amount={AMOUNT}/>);    
    
    expect(screen.queryByRole("combobox")).toHaveLength(1);

    await waitFor(()=>{
      expect(screen.queryByRole("combobox")).toHaveLength(2);
    });

    expect(screen.queryByRole("combobox")[0]).toHaveValue("3");    
    expect(screen.queryByRole("option", {name: "3 cuotas de 3,33 €/mes"}).selected).toBe(true);
  });

  it("allows to change the selected quote", async ()=>{
    const {debug} = render(<App amount={AMOUNT}/>);    
    
    const select = screen.queryByRole("combobox");
    
    await waitFor(()=> expect(select).toHaveLength(2) );
    await userEvent.selectOptions(select, ["6"]);    
    expect(screen.queryByRole("option", {name: "6 cuotas de 1,66 €/mes"}).selected).toBe(true);
  });
});
