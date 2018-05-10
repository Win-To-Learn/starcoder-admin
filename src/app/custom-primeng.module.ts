/**
 * CustomPrimeNGModule.js
 *
 * Created by jay on 4/24/18
 */
import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/primeng';
//import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {ToolbarModule} from 'primeng/toolbar';
import {DataViewModule} from 'primeng/dataview';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {GrowlModule} from 'primeng/growl';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {TableModule} from 'primeng/table';

@NgModule({
    imports: [
        ButtonModule,
        DropdownModule,
        InputTextModule,
        //CardModule,
        PanelModule,
        ToolbarModule,
        DataViewModule,
        ProgressSpinnerModule,
        GrowlModule,
        MessageModule,
        MessagesModule,
        TableModule
    ],
    exports: [
        ButtonModule,
        DropdownModule,
        InputTextModule,
        //CardModule,
        PanelModule,
        ToolbarModule,
        DataViewModule,
        ProgressSpinnerModule,
        GrowlModule,
        MessageModule,
        MessagesModule,
        TableModule
    ]
})
export class CustomPrimeNGModule { }