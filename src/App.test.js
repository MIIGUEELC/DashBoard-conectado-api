import { render, screen } from "@testing-library/react";
import { HeaderButton } from "./components/HeaderButton";


describe("test", () => {
  render(
    <HeaderButton />);

  test("The component is displayed in the document.", () => {
    const linkElemen = screen.getByTestId('sidebar-button');
    expect(linkElemen).toBeInTheDocument();
  });

  test("The component shows", () => {
   const props = {
      color: 'red',
    }
    
    render(<HeaderButton {...props}/>);
    const button = screen.getByTestId('sidebar-button');
    expect(button).toHaveStyle("color: red");
  });

  test("The component shows", () => {
    
     
     render(<HeaderButton color='blue'/>);
     const button = screen.getByTestId('sidebar-button');
     expect(button).toHaveStyle("color: blue");
   });

});




