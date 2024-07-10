import React from "react";
import { render, screen } from "@testing-library/react";

import StocksPage from "../StocksPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders stocks page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <StocksPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("stocks-datatable")).toBeInTheDocument();
    expect(screen.getByRole("stocks-add-button")).toBeInTheDocument();
});
