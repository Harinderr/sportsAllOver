'use client'
import styles from "@/components/featureSection/feature.module.css"
import Navbar from "../navbar/navbar"

export default function Feature() {
    function bgStyle() {
        const heading = document.getElementById('landing-heading');
        if (heading) {
            heading.style.opacity = 1 - window.pageYOffset / 900;
            heading.style.backgroundSize = 160 - window.pageYOffset / 12 + "%";
        }
    }

    // You can uncomment this when ready to test the scroll effect.
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         window.addEventListener('scroll', bgStyle);
    //         return () => {
    //             window.removeEventListener('scroll', bgStyle);
    //         };
    //     }
    // }, []);

    return (
        <div className={`${styles.features}`}>
            <div className={`${styles.right} w-full overflow-hidden h-full`}>
               
                <div className="feature_box h-full px-5 py-20 sm:px-10 lg:px-20 lg:py-40 xl:px-40 2xl:px-60 flex flex-col items-start  gap-4">
                <h1 
  id="landing-heading" 
  className={`${styles.heading} font-extraBold tracking-wider text-[3.5rem] text-wrap md:text-[6rem] xl:text-[8rem] leading-none md:leading-tight xl:leading-tight text-slate-100`}
>
  FUEL YOUR <span className="text-blue-500">PASSION</span>, IGNITE THE GAME
</h1>

                    <p className="text-xs sm:text-sm xl:text-xl tracking-wider">
                        Get the info on the latest sports events, players, and blogs of various sports.
                    </p>
                    <button className="py-2 font-bold text-xs sm:text-sm xl:text-xl hover:bg-white hover:text-black px-4 sm:px-6 border-2 border-white">
                        READ MORE
                    </button>
                </div>
            </div>
        </div>
    );
}
