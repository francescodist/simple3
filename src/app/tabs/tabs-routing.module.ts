import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "text",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../text/text.module").then(m => m.TextPageModule)
          }
        ]
      },
      {
        path: "pdf",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pdf/pdf.module").then(m => m.PdfPageModule)
          }
        ]
      },
      {
        path: "image",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../image/image.module").then(m => m.ImagePageModule)
          }
        ]
      },
      {
        path: "voice",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../voice/voice.module").then(m => m.VoicePageModule)
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/text",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/text",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
