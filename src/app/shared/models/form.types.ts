import { FormArray, FormControl, FormGroup } from "@angular/forms";

export type Unpacked<T> = T extends Array<infer U> ? U : T;

export type ToForm<OriginalType> = {
  [key in keyof OriginalType]
    : OriginalType[key] extends Array<any>
      ? FormArray<
        Unpacked<OriginalType[key]> extends object
          ? FormGroup<ToForm<Unpacked<OriginalType[key]>>>
          : FormControl<Unpacked<OriginalType[key]> | null>
        >
      :OriginalType[key] extends object
        ? FormGroup<ToForm<OriginalType[key]>>
        : FormControl<OriginalType[key] | null>
};
// Source: https://fullstackladder.dev/blog/2022/05/15/angular-14-strict-typed-reactive-forms/