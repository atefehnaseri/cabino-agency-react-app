import { useEffect, useRef } from "react";
import { useSettings } from "./useSettings";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { isUpdating, updateSetting } = useUpdateSetting();
  const {
    isLoading,
    settings: {
      minimumBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  // const initialSettingRef = useRef({
  //   minimumBookingLength,
  //   maxBookingLength,
  //   maxGuestsPerBooking,
  //   breakfastPrice,
  // });
  const initialSettingRef = useRef({});

  useEffect(() => {
    if (!isLoading) {
      initialSettingRef.current = {
        minimumBookingLength,
        maxBookingLength,
        maxGuestsPerBooking,
        breakfastPrice,
      };
    }
  }, [
    isLoading,
    minimumBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  ]);
  function handleUpdateSetting(e, fieldName) {
    const inputValue = Number(e.target.value);

    if (!inputValue) return;

    const prevValue = initialSettingRef.current[fieldName];
    if (prevValue === inputValue) return;

    initialSettingRef.current[fieldName] = inputValue;
    updateSetting({ [fieldName]: inputValue });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="min-nights"
          defaultValue={minimumBookingLength}
          onBlur={(e) => handleUpdateSetting(e, "minimumBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdateSetting(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
