// app.test.js
import { render, screen } from "@testing-library/react";
import Expenses from "./Components/Expenses/Expenses";
import ProfileForm from "./Components/Profile/ProfileForm";
import MainNavigation from "./Components/Layout/MainNavigation";

describe("Expense Tracker Component", () => {
  test("renders Money Spent as a test", () => {
    render(<Expenses />);
    const moneySpentElement = screen.getByText("Money Spent:");
    expect(moneySpentElement).toBeInTheDocument();
  });

  test("renders Description as a test", () => {
    render(<Expenses />);
    const descriptionElement = screen.getByText("Description:");
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders Category as a test", () => {
    render(<Expenses />);
    const categoryElement = screen.getByText("Category:");
    expect(categoryElement).toBeInTheDocument();
  });
});

describe("Profile Form Component", () => {
  test("renders Full Name as a test", () => {
    render(<ProfileForm />);
    const fullNameElement = screen.getByText("Full Name");
    expect(fullNameElement).toBeInTheDocument();
  });

  test("renders Profile Photot URL as a test", () => {
    render(<ProfileForm />);
    const profilePhotoElement = screen.getByText("Profile Photot URL");
    expect(profilePhotoElement).toBeInTheDocument();
  });
});

describe("Main Navigation Component", () => {
  test("renders Expense Tracker Logo as a test", () => {
    render(<MainNavigation />);
    const ExpensesLogoElement = screen.getByText("Expense Tracker");
    expect(ExpensesLogoElement).toBeInTheDocument();
  });

  test("renders Download Expenses as a test", () => {
    render(<MainNavigation />);
    const downloadExpensesElement = screen.getByText("Download Expenses");
    expect(downloadExpensesElement).toBeInTheDocument();
  });

  test("renders Login as a test", () => {
    render(<MainNavigation />);
    const loginElement = screen.getByText("Login");
    expect(loginElement).toBeInTheDocument();
  });

  test("renders Profile as a test", () => {
    render(<MainNavigation />);
    const profileElement = screen.getByText("Profile");
    expect(profileElement).toBeInTheDocument();
  });

  test("renders Logout as a test", () => {
    render(<MainNavigation />);
    const logoutElement = screen.getByText("Logout");
    expect(logoutElement).toBeInTheDocument();
  });
});
