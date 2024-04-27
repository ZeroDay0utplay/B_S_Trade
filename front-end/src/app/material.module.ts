import { NgModule } from "@angular/core";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { MatIconModule } from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
    exports: [
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatIconModule,
        MatButtonModule,
    ]
})

export class MaterialModule{}