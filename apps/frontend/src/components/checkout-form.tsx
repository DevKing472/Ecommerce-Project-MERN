import { MDBValidationItem, MDBInput } from 'mdb-react-ui-kit';

interface Props {
  name: string;
  data: [] | undefined;
  refs: any[];
}

export function CheckoutForm({ name, data, refs }: Props) {
  return (
    <>
      <MDBValidationItem
        feedback="Has to be full name for delivery"
        invalid
        className="mb-3 pb-1"
      >
        <MDBInput
          type="text"
          name={`${name}-name`}
          label="Full name"
          ref={refs[0]}
          required
        />
      </MDBValidationItem>
      <MDBValidationItem
        feedback="Street address is required"
        invalid
        className="mb-3 pb-1"
      >
        <MDBInput
          type="text"
          name={`${name}-street`}
          label="Street address with home/office/apt"
          ref={refs[1]}
          required
        />
      </MDBValidationItem>
      <MDBValidationItem
        feedback="City is required"
        invalid
        className="mb-3 pb-1"
      >
        <MDBInput
          type="text"
          name={`${name}-city`}
          ref={refs[2]}
          label="City"
          required
        />
      </MDBValidationItem>
      <MDBValidationItem
        feedback="Please choose your country"
        invalid
        className="mb-3 pb-1"
      >
        {data ? (
          <select
            className="form-control"
            name={`${name}-country`}
            ref={refs[3]}
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select country
            </option>
            {data
              .sort((a: any, b: any) =>
                a.name.common.localeCompare(b.name.common)
              )
              .map((country: any) => (
                <option key={`${name}-${country.ccn3}`} value={country.cca2}>
                  {country.flag + ' ' + country.name.common}
                </option>
              ))}
          </select>
        ) : (
          <MDBInput type="text" name={`${name}-contry`} ref={refs[3]} />
        )}
      </MDBValidationItem>
      <MDBValidationItem
        feedback="ZIP has to be a number"
        invalid
        className="mb-3 pb-1"
      >
        <MDBInput
          type="text"
          name={`${name}-zip`}
          label="Zip code"
          ref={refs[4]}
          required
        />
      </MDBValidationItem>
    </>
  );
}
