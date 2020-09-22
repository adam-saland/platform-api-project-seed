import { storeTemplate, getTemplates } from './template-store.js';

fin.me.showDeveloperTools();

fin.Platform.init({
    overrideCallback: async (Provider) => {
        class Override extends Provider {

            /* 
                @async quit(...args) 
                
                description: On clicking a Platform window's close button
                we override the Platform.quit() method to save the snapshot to our
                external template-store. 
                
                @returns super.quit(...args) returns the quit method after we add the 
                additional logic. To ensure consistency, we return the original arguments
                as well.
            */
            async quit(...args) {
                console.log(...args)
                const name = "snapshot-"+Date.now();
                const snapShot = await fin.Platform.getCurrentSync().getSnapshot();
                storeTemplate("snapshot-store", {name, snapshot: snapShot});
                return super.quit(...args)
            }
            
            async applySnapshot({ snapshot, options }, callerIdentity) {
                /* 
                    Retrieve last saved snapshot on start/restart of a Platform.quit() call
                    templates:= @getTemplates(@store-name) => Array({name, snapshot})
                */
                const templates = getTemplates("snapshot-store");
                // if no templates exist return the method with its original arguments
                if (templates.length === 0) {
                    return super.applySnapshot({ snapshot, options }, callerIdentity)
                    
                } else { // otherwise grab the last saved template pass that templates snapshot in to be returned
                    const lastSnapShot = templates[templates.length-1].snapshot;
                    return super.applySnapshot({ snapshot: lastSnapShot, options: { ...options, closeExistingWindows: true} }, callerIdentity);
                }

            }
        };
        return new Override();
    }
});
