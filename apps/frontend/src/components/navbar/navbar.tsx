import Link from 'next/link';
import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBInput,
  MDBBtn,
  MDBBadge,
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AdminDropdown } from './admin';
import { useCart, useUser } from '@/hooks';

export function Navbar() {
  const [showNavToggler, setShowNavToggler] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isAdmin, id, logout } = useUser();
  const { itemCount } = useCart();
  const { pathname } = useRouter();

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <MDBNavbar fixed="top" expand={isAdmin ? 'xl' : 'lg'} light bgColor="light">
      <MDBContainer breakpoint="lg">
        <MDBNavbarBrand href="#">JETZT IST DIE BESTE ZEIT</MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavToggler(!showNavToggler)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavToggler}>
          <MDBNavbarNav right fullWidth={false}>
            <MDBNavbarItem>
              <form className="d-flex w-auto">
                <MDBInputGroup>
                  <MDBBtn>
                    <MDBIcon icon="search" />
                  </MDBBtn>
                  <MDBInput type="text" label="Search" id="search" />
                </MDBInputGroup>
              </form>
            </MDBNavbarItem>
            {isAdmin ? <AdminDropdown /> : null}
            <MDBNavbarItem onClick={() => setShowNavToggler(false)}>
              <Link
                href="/"
                className={`nav-link ${pathname === '/' ? 'active' : ''}`}
              >
                <MDBIcon className="me-1" icon="home" />
                Home
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem onClick={() => setShowNavToggler(false)}>
              <Link
                href="/products"
                className={`nav-link ${
                  pathname === '/products' ? 'active' : ''
                }`}
              >
                <MDBIcon className="me-1" icon="book-open" />
                Catalogue
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem onClick={() => setShowNavToggler(false)}>
              <Link
                href="/cart"
                className={`nav-link d-flex align-items-center ${
                  pathname === '/cart' ? 'active' : ''
                }`}
              >
                {itemCount > 0 ? (
                  <MDBBadge color="danger">{itemCount}</MDBBadge>
                ) : null}
                <MDBIcon className="me-1" icon="shopping-cart" />
                Cart
              </Link>
            </MDBNavbarItem>
            <MDBNavbarItem onClick={() => setShowNavToggler(false)}>
              {id === '' ? (
                <Link
                  href="/auth"
                  className={`nav-link ${pathname === '/auth' ? 'active' : ''}`}
                >
                  <MDBIcon className="me-1" icon="sign-in-alt" />
                  Authorize
                </Link>
              ) : (
                <Link
                  href=""
                  onClick={async () => {
                    const response = await fetch(
                      'http://localhost:3001/auth/logout',
                      {
                        credentials: 'include',
                      }
                    );
                    const data = await response.json();
                    if (data.success) logout();
                  }}
                  className={`nav-link ${pathname === '/auth' ? 'active' : ''}`}
                >
                  <MDBIcon className="me-1" icon="sign-in-alt" />
                  Logout
                </Link>
              )}
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
