// import React, { useReducer } from 'react';
// import { DropDownOptionsContext, dropDownOptionsReducer } from '../../store';

// /**
//  * Provides the user state to the application.
//  *
//  * Uses the `UserContext` to expose the user state to the application.
//  *
//  * Automatically persists the user state to local storage.
//  *
//  * @returns {JSX.Element} The user state provider element.
//  */
// export const DropDownOptionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
//   const [state, dispatch] = useReducer(dropDownOptionsReducer, null)

//   return (
//     <DropDownOptionsContext.Provider value={[state, dispatch]}>
//       {children}
//     </DropDownOptionsContext.Provider>
//   );
// };
