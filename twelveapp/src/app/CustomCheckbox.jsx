import React from "react";
import { useCheckbox, Chip, VisuallyHidden } from "@nextui-org/react";
import { tv } from "tailwind-variants";

const checkbox = tv({
  slots: {
    base: "border-1 cursor-pointer transition-colors rounded-md",
    content: "text-current transition-colors rounded-md"
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary transition-colors rounded-md",
        content: "text-primary-foreground transition-colors rounded-md"
      },
      false: {
        base: "border-default bg-transparent rounded-md",
        content: "text-default-600 rounded-md"
      }
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background rounded-md",
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
      >
        {children || (isSelected ? "Enabled" : "Disabled")}
      </Chip>
    </label>
  );
};

export default CustomCheckbox;