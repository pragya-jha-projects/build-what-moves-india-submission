# JanSeva Chrome extension

Build the extension from the repository root:

```powershell
npm run build:extension
```

Then open `chrome://extensions`, enable **Developer mode**, choose **Load
unpacked**, and select the `apps/extension/dist` folder. Do not load the
source `apps/extension` folder directly.

The unpacked extension uses the stable ID
`dopehmeollifihgnpidnjefnnlfhahag`, which is the ID expected by the JanSeva
website. After loading or reloading the extension, save the profile again on
the website to sync it to the side panel.
