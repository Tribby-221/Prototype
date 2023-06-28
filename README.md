# Using UnityRenderingStream
Unity3D livestream multiple cameras into webapp with coturn ICEserver
<B>(prototype)</B>
## Unity3D
Version 2022.3.1f1
### Things to take note
Project settings : ICE Servers </br>
![ProjectSettings](https://github.com/Tribby-221/Prototype/assets/13588442/2af4adc9-f3c7-46e5-bdc7-ca0976116331)
<B> Game view to be visable in unity3D when navigating the webapp </B> </BR>
![layout](https://github.com/Tribby-221/Prototype/assets/13588442/900dfd55-d8f4-4393-80d1-233499b423ab)

## Coturn Server
open source Coturn server : https://github.com/coturn/coturn </BR>
guides to install : https://nsoft-s.com/en/mychatarticles/1283-how-to-install-turn-server-for-windows.html </BR>
1. install cygwin : https://www.cygwin.com/
2. Packages to install : </BR> ![cygwin-x86_8XQ5fbgLKB](https://github.com/Tribby-221/Prototype/assets/13588442/da9581a8-78bb-46fc-8822-2fc464e5e0ff)
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
run 'node ./server.js' on Webbapp folder
1. Navigate to WebApp folder with command terminal
2. `npm install` or ('npm i -f' if faced with dependencies issues)
3. `npm run build`
4. `npm run start` or `npm start`
5. navigate to reciver sample
### Things to take note
in UnityRenderingStream\WebApp\client\public\js\config.js </BR>
URL : is stated as shown in https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/ (stun:IP_ADDRESS:Port)

## Recorded Video File Path
C:\Users\User\Desktop\Unity3D\RenderStream\Record </BR>
C:\Users\User\Documents\RockVR\Video (if not found from the path above)

## (For offline) virtual lan
1. Install HyperV (https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v#enable-hyper-v-with-cmd-and-dism)
2. launch HyperV manager => Virtual switch manager => create new virtual network switch (private)
3. cmd 'ipconfig /all' should show up the virtual ethernet.
