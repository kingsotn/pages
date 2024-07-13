import React from "react";
import { useCheckbox, Chip, VisuallyHidden } from "@nextui-org/react";
import { tv } from "tailwind-variants";

const checkbox = tv({
  slots: {
    base: "border-2 cursor-pointer transition-colors",
    content: "text-current transition-colors"
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary transition-colors",
        content: "text-primary-foreground transition-colors"
      },
      false: {
        base: "border-default bg-transparent",
        content: "text-default-500"
      }
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      }
    }
  },
  defaultVariants: {
    isSelected: false
  }
});

export const CustomCheckbox = (props) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props
  });

  const styles = React.useMemo(() => checkbox({ isSelected, isFocusVisible }), [isSelected, isFocusVisible]);

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip classNames={{
        base: styles.base(),
        content: styles.content(),
      }}
        // variant="flat"
      >
        {children || (isSelected ? "Enabled" : "Disabled")}
      </Chip>
    </label>
  );
};

export default CustomCheckbox;