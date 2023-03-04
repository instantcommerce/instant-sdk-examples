import { useMemo } from 'react';
import { useRequestData } from '@instantcommerce/sdk';

import { MoneyV2 } from '~/lib/shopify';

export interface UseMoneyValue {
  /**
   * The currency code from the `MoneyV2` object.
   */
  currencyCode: any;
  /**
   * The name for the currency code, returned by `Intl.NumberFormat`.
   */
  currencyName?: string;
  /**
   * The currency symbol returned by `Intl.NumberFormat`.
   */
  currencySymbol?: string;
  /**
   * The currency narrow symbol returned by `Intl.NumberFormat`.
   */
  currencyNarrowSymbol?: string;
  /**
   * The localized amount, without any currency symbols or non-number types from the `Intl.NumberFormat.formatToParts` parts.
   */
  amount: string;
  /**
   * All parts returned by `Intl.NumberFormat.formatToParts`.
   */
  parts: Intl.NumberFormatPart[];
  /**
   * A string returned by `new Intl.NumberFormat` for the amount and currency code,
   * using the `shopify.config.js` locale.
   */
  localizedString: string;
  /**
   * The `MoneyV2` object provided as an argument to the hook.
   */
  original: MoneyV2;
}

/**
 * The `useMoney` hook takes a [`MoneyV2` object](/api/storefront/reference/common-objects/moneyv2) and returns a
 * default-formatted string of the amount with the correct currency indicator, along with some of the parts provided by
 * [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
 */
export const useMoney = (money?: MoneyV2): UseMoneyValue | undefined => {
  const { locale } = useRequestData();

  const options = useMemo(
    () => ({
      style: 'currency',
      currency: money?.currencyCode
    }),
    [money?.currencyCode]
  );

  let amount = parseFloat(money?.amount);

  const value = useMemo(
    () =>
      !Number.isNaN(amount)
        ? new Intl.NumberFormat(locale, options).format(amount)
        : '–',
    [amount, locale, options]
  );

  const baseParts = amount
    ? new Intl.NumberFormat(locale, options).formatToParts(amount)
    : [];
  const nameParts = amount
    ? new Intl.NumberFormat(locale, {
        ...options,
        currencyDisplay: 'name'
      }).formatToParts(amount)
    : [];
  const narrowParts = amount
    ? new Intl.NumberFormat(locale, {
        ...options,
        currencyDisplay: 'narrowSymbol'
      }).formatToParts(amount)
    : [];

  const moneyValue = useMemo(
    () =>
      money
        ? {
            currencyCode: money.currencyCode,
            currencyName:
              nameParts.find((part) => part.type === 'currency')?.value ?? // e.g. "US dollars"
              money.currencyCode,
            currencySymbol:
              baseParts.find((part) => part.type === 'currency')?.value ?? // e.g. "USD"
              money.currencyCode,
            currencyNarrowSymbol:
              narrowParts.find((part) => part.type === 'currency')?.value ?? '', // e.g. "$"
            parts: baseParts,
            localizedString: value,
            amount: baseParts
              .filter((part) =>
                ['decimal', 'fraction', 'group', 'integer', 'literal'].includes(
                  part.type
                )
              )
              .map((part) => part.value)
              .join(''),
            original: money
          }
        : undefined,
    [baseParts, money, nameParts, narrowParts, value]
  );

  return moneyValue;
};
