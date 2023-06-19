# UnityRenderingStream
Unity3D into webapp with coturn ICEserver
<B>(prototype)</B>
## Unity3D
Version 2022.3.1f1
### Things to take note
Project settings : ICE Servers </br>
![ProjectSettings](https://github.com/docchopper221/UnityRenderingStream/assets/13588442/318247c3-314c-4fe4-990d-c57f7f2ea3b9)
<B> Game view to be visable in unity3D when navigating the webapp </B> </BR>
![layout](https://github.com/docchopper221/UnityRenderingStream/assets/13588442/38b7deea-0e56-4211-b4dd-70e212653421)

## Coturn Server
open source Coturn server : https://github.com/coturn/coturn </BR>
guides to install : https://nsoft-s.com/en/mychatarticles/1283-how-to-install-turn-server-for-windows.html </BR>
1. install cygwin : https://www.cygwin.com/
2. Packages to install : </BR>![image](https://github.com/docchopper221/UnityRenderingStream/assets/13588442/40c5597f-9916-4605-a49d-e582545b93ee)
3. place the corturn files into : "Installed drive\cygwin64\home\User"
4. run cygwin terminal navigate to coturn, run `./configure`
5. run `make`
6. run `make install`
7. place the turnserver.conf into "Installed driver\cygwin64\usr\local\etc"
8. run `turnserver`
### test server running
https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/ </BR>
Turn URI: turn:127.0.0.1
turn user and password within turnserver.conf

## WebApp
1. Navigate to WebApp folder with command terminal
2. `npm install` or ('npm i -f' if faced with dependencies issues)
3. `npm run build`
4. `npm run start` or `npm start`
5. navigate to reciver sample
### Things to take note
UnityRenderingStream\WebApp\client\public\js </BR>
URL : is stated as https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/
