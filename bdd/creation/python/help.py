import tkinter as tk
from tkinter import PhotoImage

class BlinkingBackgroundWindow:
    def __init__(self, master):
        self.master = master
        self.master.title("remplissage-bdd") #code de remplissage de bdd par bibliothèque extérieur

        image_path = "disk.png"  
        self.image = PhotoImage(file=image_path)
        resized_image = self.image.subsample(2, 2)
        
        self.blinking_label = tk.Label(master, image=self.image, bg="red")
        self.blinking_label.pack(expand=True, fill="both", padx=1, pady=1)
        
        self.blink_background()

    def blink_background(self):
        
        if self.blinking_label.cget("bg") == "red":
            self.blinking_label.configure(bg="green")
        else:
            self.blinking_label.configure(bg="red")

        
        self.master.after(80, self.blink_background)

def main():
    fenetre = tk.Tk()
    fenetre.geometry("1000x1000") 
    app = BlinkingBackgroundWindow(fenetre)
    fenetre.mainloop()

if __name__ == "__main__":
    main()