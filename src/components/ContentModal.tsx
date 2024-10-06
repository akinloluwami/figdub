import React, { useEffect, useState } from "react";
import { Dices, LoaderCircle, Sparkles, X } from "lucide-react";
import { Toaster, toast } from "sonner";

const generateKey = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < 6; i++) {
    key += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return key;
};

const ContentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState("");

  const [loading, setLoading] = useState(false);

  const generateShortLink = async () => {
    setLoading(true);
    const url = window.location.href;
    try {
      const res = await fetch(
        `https://figdub.koyeb.app/create-link?url=${url}&key=${key}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        const shortLink = data.shortLink;
        toast.success("Short link copied to clipboard");
        await navigator.clipboard.writeText(shortLink);
        setIsOpen(false);
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create short link");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const toolbar = document.querySelector(
        ".toolbar_view--buttonGroup--UA9-B"
      );

      const figDubBubButton = document.querySelector(".figdub-button");
      if (figDubBubButton) return;

      if (toolbar) {
        console.log("FIGDUB");
        const button = document.createElement("button");

        button.classList.add(
          "mx-2",
          "figdub-button",
          "p-2",
          "hover:bg-black/90",
          "transition-colors"
        );

        button.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 64C50.1731 64 64.5 49.6731 64.5 32C64.5 20.1555 58.0648 9.81393 48.5 4.28099V31.9999V47.9998H40.5V45.8594C38.1466 47.2207 35.4143 47.9999 32.5 47.9999C23.6634 47.9999 16.5 40.8364 16.5 31.9999C16.5 23.1633 23.6634 15.9999 32.5 15.9999C35.4143 15.9999 38.1466 16.779 40.5 18.1404V1.00812C37.943 0.350018 35.2624 0 32.5 0C14.8269 0 0.5 14.3269 0.5 32C0.5 49.6731 14.8269 64 32.5 64Z" fill="white"/>
          </svg>
        `;

        button.addEventListener("click", () => {
          setKey(generateKey());
          setIsOpen(true);
        });

        toolbar.appendChild(button);
        observer.disconnect();
      } else {
        console.log("FIGDUB NOT FOUND");
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Toaster richColors position="top-center" />
      {isOpen && (
        <div className="fixed inset-0 text-white flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg w-[500px] h-[250px] relative">
            <button
              className="absolute right-2 top-2"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
            <h2 className="text-2xl mb-4 font-semibold">FigDub</h2>
            <p className="text-gray-400">Generate a short link for this file</p>
            <div className="flex mt-4 items-center gap-x-3 w-full">
              <div className="rounded-md text-lg w-full bg-white/10 h-12 flex items-center p-3">
                <p className="font-medium text-purple-400">fig.page/</p>{" "}
                <input
                  type="text"
                  placeholder=""
                  className="w-full bg-transparent text-white"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                />
              </div>
            </div>
            <button
              className="text-white bg-purple-400 font-medium w-full h-12 rounded-md mt-4 flex items-center justify-center gap-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={generateShortLink}
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ContentModal;
