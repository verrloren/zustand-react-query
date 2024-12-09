"use client";
import { ComponetsWrapper } from "@/components/componets-wrapper";
import { Provider } from "react-redux";
import { store } from "@/shared/redux";





export default function Home() {

	
  return (


		<Provider store={store}>
      <ComponetsWrapper />
		</Provider>
		
  );
}