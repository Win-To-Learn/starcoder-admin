/**
 * CustomMaterialModule.js
 *
 * Created by jay on 4/24/18
 */
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule
    ],
})
export class CustomMaterialModule { }