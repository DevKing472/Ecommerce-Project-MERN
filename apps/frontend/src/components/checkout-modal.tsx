import { Address } from '@/types';
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import { useState } from 'react';

interface Props {
  show: boolean;
  showAction: () => any;
  redirect: () => any;
  content: string;
  addressShipping: Address;
  addressBilling: Address;
  action?: () => any;
}

export function CheckoutModal({
  show,
  showAction,
  action,
  redirect,
  content,
  addressBilling,
  addressShipping,
}: Props) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  return isBrowser ? (
    <MDBModal show={show}>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>
              Would you like to use these addresses?
            </MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={showAction}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            {content}
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th scope="col" style={{ width: '100px' }}>
                    *
                  </th>
                  <th scope="col">Shipping</th>
                  <th scope="col">Billing</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>Street</td>
                  <td>{addressShipping.street}</td>
                  <td>{addressBilling.street}</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>{addressShipping.city}</td>
                  <td>{addressBilling.city}</td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>{addressShipping.country}</td>
                  <td>{addressBilling.country}</td>
                </tr>
                <tr>
                  <td>Full name</td>
                  <td>{addressShipping.fullName}</td>
                  <td>{addressBilling.fullName}</td>
                </tr>
                <tr>
                  <td>ZIP</td>
                  <td>{addressShipping.zip}</td>
                  <td>{addressBilling.zip}</td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={showAction}>
              No
            </MDBBtn>
            <MDBBtn
              color="primary"
              onClick={() => {
                action && action();
                redirect();
              }}
            >
              Yes
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  ) : null;
}
