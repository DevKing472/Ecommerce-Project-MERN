import {
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavbarItem,
} from 'mdb-react-ui-kit';
import Link from 'next/link';

export function AdminDropdown() {
  return (
    <MDBNavbarItem>
      <MDBDropdown>
        <MDBDropdownToggle
          color="link"
          size="lg"
          className="nav-link"
          role="button"
        >
          <MDBIcon icon="toolbox" className="me-1" size="lg" />
          Admin
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem header>
            <MDBIcon fas icon="sitemap" />
            Products
            <MDBDropdownItem>
              <Link href="/admin/items/new" className="nav-link">
                <MDBIcon fas icon="plus" className="me-1" size="lg" />
                Create new item
              </Link>
            </MDBDropdownItem>
            <MDBDropdownItem>
              <Link href="/admin/items" className="nav-link">
                <MDBIcon fas icon="ellipsis-v" className="me-1" size="lg" />
                List all
              </Link>
            </MDBDropdownItem>
          </MDBDropdownItem>
          <MDBDropdownItem header>
            <MDBIcon fas icon="handshake" className="me-1" size="lg" />
            Orders
            <MDBDropdownItem>
              <Link href="/admin/orders" className="nav-link">
                <MDBIcon fas icon="ellipsis-v" className="me-1" size="lg" />
                List all
              </Link>
            </MDBDropdownItem>
          </MDBDropdownItem>
          <MDBDropdownItem header>
            <MDBIcon fas icon="images" className="me-1" size="lg" />
            Carousel
            <MDBDropdownItem>
              <Link href="/admin/carousel" className="nav-link">
                <MDBIcon fas icon="edit" className="me-1" size="lg" />
                Edit
              </Link>
            </MDBDropdownItem>
          </MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBNavbarItem>
  );
}
