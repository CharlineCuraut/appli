import React from "react";
import { ThemeContext } from "./theme_context";
import { IdContext } from "./id_context";
import { ContextCombinedThemeAndId } from "./combined_context";

// This is a reusable piece that could be used by any component that requires both contexts.
const ProvideCombinedContext = props => {
  return (
    <ThemeContext.Consumer>
      {(contextTheme) => (
        <IdContext.Consumer>
          {contextId => (
            <ContextCombinedThemeAndId.Provider value={{ contextTheme, contextId }}>
              {props.children}
            </ContextCombinedThemeAndId.Provider>
          )}
        </IdContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
};
export default ProvideCombinedContext;