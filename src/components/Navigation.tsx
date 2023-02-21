import React, { Children } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavbarBrand, Row } from "reactstrap";
import { INavigationProps } from "../constants/types/components";

/**
 * navigation bar
 */
const Navigation: React.FunctionComponent<INavigationProps> = (props) => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/*<!-- Page content here -->*/}
        <div>
          <div className="navbar bg-base-100">
            <div className="flex-none">
              <label
                htmlFor="my-drawer"
                className="btn btn-square btn-ghost drawer-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl" href={`/`}>
                dashboard
              </a>
            </div>
            <div className="flex-1">
              <a className="font-bold text-xl">
                {props.title?.replace(/_/g, " ")}
              </a>
            </div>
            <div className="flex-none">
              <button className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          {props.children}
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
          {/*<!-- Sidebar content here -->*/}
          <li>
            <a className="font-normal" href={`/`}>SOURCES</a>
          </li>
          {props.drawerItems?.map((value: string, index: number) => (
            <li>
              <a
                key={index}
                className="font-semibold hover:font-bold btn-ghost capitalize"
                href={`/${value}`}
              >
                {value.replace(/_/g, " ")}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
