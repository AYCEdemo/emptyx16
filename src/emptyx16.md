# Emptyx16 - X16 Hardware Specs

Commander X16 hardware specifications

### X16 Hardware Specifications
[X16 Overview](#x16-overview)  
[X16 I/O Map](#x16-io-map)  
[X16 Memory](#x16-memory)  
[X16 Versatile Embedded Retro Adapter (VERA)](#x16-versatile-embedded-retro-adapter-vera)  
[X16 Peripherals](#x16-peripherals)  
[X16 I2C Bus](#x16-i2c-bus)  
[X16 Timings](#x16-timings)  
[X16 Pinouts](#x16-pinouts)  
[X16 Hardware History](#x16-hardware-history)  
[VIA Versatile Interface Adapter](#via-versatile-interface-adapter)  
[YM2151 FM Operator Type-M (OPM)](#ym2151-fm-operator-type-m-opm)  
[CPU 65C02 Microprocessor](#cpu-65c02-microprocessor)  

### About
[About/Credits](#aboutcredits)

# X16 Overview

### CPU
```
CPU         WDC 65C02 8-bit CPU, 8.0MHz
```

### Internal Memory
```
System ROM  512 KiB
Fixed RAM   39.75 KiB
Banked RAM  512 KiB (Installable up to 2 MiB)
VERA RAM    128 KiB
Audio FIFO  4 KiB
RTC NVRAM   64 bytes
```

### Video
```
Display     640x480 pixels with 4096 colors
BG layers   2 background layers
BG types    Tile/map-based or bitmap-based
BG colors   256 colors, or 2/4/16 colors/16 palettes
Spr colors  256 colors, or 16 colors/16 palettes
Spr size    16 types (in range of 8x8 up to 64x64)
Sprs/Screen max. 128 sprites of any size (up to 64x64 each)
Sprs/Line   max. 80 sprites of 8x8 size (under best circumstances)
```

### Sound
```
VERA PSG    16 channels, pulse/saw/triangle/noise
VERA PCM    1 channel, 8/16-bit mono/stereo PCM
YM2151      8 channels, phase-modulated sine
```

### Interface Ports
```
PS/2 port   Separate connector for Keyboard and Mouse
Joypad      2x SNES controller ports
Serial      Commodore serial bus
Memory card SPI mode MMC interface
```


# X16 I/O Map

### First some bytes
```
0000h        - Current RAM Bank (R/W)
0001h        - Current ROM Bank (R/W)
0002h..9EFFh - Fixed RAM
```

### VIA Versatile Interface Adapter (R/W)

```
9F00h - PRB  - Port B Input/Output
9F01h - PRA  - Port A Input/Output
9F02h - DDRB - Port B Data Direction
9F03h - DDRA - Port A Data Direction
9F04h - T1L  - T1 Counter (low 8 bits)
9F05h - T1H  - T1 Counter (high 8 bits)
9F06h - T1LL - T1 Latch (low 8 bits)
9F07h - T1LH - T1 Latch (high 8 bits)
9F08h - T2L  - T2 Counter (low 8 bits)
9F09h - T2H  - T2 Counter (high 8 bits)
9F0Ah - SR   - Shift Register
9F0Bh - ACR  - Auxiliary Control Register
9F0Ch - PCR  - Peripheral Control Register
9F0Dh - IFR  - Interrupt Flags Register
9F0Eh - IER  - Interrupt Enable Register
9F0Fh - PRA2 - Port A Input/Output Without Handshaking
```

### VERA Versatile Embedded Retro Adapter (R/W)
Note: The rightmost column shows the initial value on Reset
```
9F20h - ADDR_L       - VRAM Address (lower 8 bits)                    00h
9F21h - ADDR_M       - VRAM Address (middle 8 bits)                   00h
9F22h - ADDR_H       - VRAM Address (upper 1 bit) / Increment Mode    00h
9F23h - DATA0        - VRAM Data Port 0                               00h
9F24h - DATA1        - VRAM Data Port 1                               00h
9F25h - CTRL         - Control                                        00h
9F26h - IEN          - Int. Enable / Line Comp. / Num. (upper 1 bit)  00h
9F27h - ISR          - Interrupt / Status Register                    00h
9F28h - IRQLINE_L    - Interrupt Line Compare (lower 8 bits) (W)      -
9F28h - SCANLINE_L   - Current Line Number (lower 8 bits) (R)         00h

        (DCSEL=0)
9F29h - DC_VIDEO     - Active Display Control                         00h
9F2Ah - DC_HSCALE    - Active Display H-Scale                         80h
9F2Bh - DC_VSCALE    - Active Display V-Scale                         80h
9F2Ch - DC_BORDER    - Border Color                                   00h

        (DCSEL=1)
9F29h - DC_HSTART    - Active Display H-Start                         00h
9F2Ah - DC_HSTOP     - Active Display H-Stop                          A0h
9F2Bh - DC_VSTART    - Active Display V-Start                         00h
9F2Ch - DC_VSTOP     - Active Display V-Stop                          F0h

        (DCSEL=63)
9F29h..9F2Ch         - Version Number (R)

9F2Dh - L0_CONFIG    - L0 Mode and Map Size                           00h
9F2Eh - L0_MAPBASE   - L0 Map Base                                    00h
9F2Fh - L0_TILEBASE  - L0 Tile Base and Tile Size                     00h
9F30h - L0_HSCROLL_L - L0 H-Scroll (lower 8 bits)                     00h
9F31h - L0_HSCROLL_H - L0 H-Scroll (upper 4 bits) / Bitmap Color      00h
9F32h - L0_VSCROLL_L - L0 V-Scroll (lower 8 bits)                     00h
9F33h - L0_VSCROLL_H - L0 V-Scroll (upper 4 bits)                     00h
9F34h - L1_CONFIG    - L1 Mode and Map Size                           00h
9F35h - L1_MAPBASE   - L1 Map Base                                    00h
9F36h - L1_TILEBASE  - L1 Tile Base and Tile Size                     00h
9F37h - L1_HSCROLL_L - L1 H-Scroll (lower 8 bits)                     00h
9F38h - L1_HSCROLL_H - L1 H-Scroll (upper 4 bits) / Bitmap Color      00h
9F39h - L1_VSCROLL_L - L1 V-Scroll (lower 8 bits)                     00h
9F3Ah - L1_VSCROLL_H - L1 V-Scroll (upper 4 bits)                     00h
9F3Bh - AUDIO_CTRL   - Audio FIFO Control                             00h
9F3Ch - AUDIO_RATE   - Audio FIFO Sample Rate                         00h
9F3Dh - AUDIO_DATA   - Audio FIFO Data (W)                            -
9F3Eh - SPI_DATA     - SPI Data                                       -
9F3Fh - SPI_CTRL     - SPI Control                                    00h
```

### YM2151 I/O Ports (2MHz Speed)
```
9F40h - YM2151 Register Address (W)
9F41h - YM2151 Register Data (W)
9F4xh - YM2151 Status (R)
```

### Further Memory
```
9F10h..9F1Fh - 2nd VIA Expansion
9F42h..9F5Fh - Reserved (2MHz Speed)
9F60h..9F9Fh - Expansion (8MHz Speed)
9FA0h..9FFFh - Expansion (2MHz Speed)
A000h..BFFFh - Banked RAM
C000h..FFFFh - Banked System ROM / Expansion Memory
```

### VERA Registers (internal to VERA, not the Main CPU)
[X16 VERA Memory and I/O Map (VRAM)](#x16-vera-memory-and-io-map-vram)  


# X16 Memory

[X16 Memory Map](#x16-memory-map)  
[X16 Memory Control](#x16-memory-control)  
[X16 VERA Access](#x16-vera-access)  
[X16 YM2151 Access](#x16-ym2151-access)  
[X16 System ROM Flash Access](#x16-system-rom-flash-access)  

### System ROM
System ROM is mapped directly to the CPU bus. Only a 16 KiB bank window of it
is mapped at a time. Since the banking area also covers a CPU interrupt vectors
region (FFFAh-FFFFh) and not all System ROM banks has them. It is recommended
to disable interrupts when accessing outside bank 0 of the System ROM.

### Expansion Memory
Since only first 32 banks of the system ROM are mapped directly to the CPU bus,
the remaining 224 banks are left unoccupied which allows expansion
cartridges to map its memory here.

### Fixed and Banked RAM
Fixed and Banked RAM are both mapped directly to the CPU bus. Fixed RAM has
more capacity on hardware but it was limited by memory mapping to 39.75 KiB.
For Banked RAM, only an 8 KiB bank window of it is mapped at a time.

### VERA Memory
All of VERA memory isn't mapped to the CPU bus, and can be accessed only via
I/O ports. Unlike many older consoles that have this kind of access, it can be
accessed in any time, even if VERA is currently rendering to the screen.  
[X16 VERA Memory Access](#x16-vera-memory-access)

### Audio FIFO buffer
Audio FIFO buffer isn't mapped to either CPU bus or VERA memory, and can be
accessed only via write-only I/O ports. The buffer is 4095 bytes in size (the
last byte is not used to prevent overflow).  
[X16 VERA Audio FIFO](#x16-vera-audio-fifo)

### RTC NVRAM
This small 64 bytes memory comes with the on-board Real-Time Clock chip. It is
used to store data that needs to last across power cycles without the usage of
memory card since the System ROM is not writable from software. RTC NVRAM isn't
mapped to the CPU bus, and can be accessed only via I2C bus.  
[X16 I2C Bus Access](#x16-i2c-bus-access)

## X16 Memory Map

The X16 uses a 16-bit address bus (0000h-FFFFh). In order to access more than
64 KiB, it has two 8-bit transparent latches to hold the current RAM bank and
ROM bank. These combined 24-bit addresses are then used to address banked RAM
and system ROM area in order.

### Overall Memory Map
```
Bank    Offset      Content
        0000h-9EFFh Fixed RAM
        9F00h-9FFFh I/O Area
00h-FFh:A000h-BFFFh Banked RAM (max 2 MiB) (256x8K)
00h-1Fh:C000h-FFFFh System ROM (512 KiB) (32x16K)
20h-FFh:C000h-FFFFh Expansion Memory (max 3.5 MiB) (224x16K)
```
Additional memory, not mapped to CPU address (accessible only via I/O):
```
VERA Memory (128 KiB)
Audio FIFO  (4 KiB)
RTC NVRAM   (64 bytes)
```
For details on separate I/O ports and expansions, see:  
[X16 I/O Map](#x16-io-map)

### Default RAM Usage
By default, the addresses at 0080h-03FFh and banked RAM bank 00h are reserved
for CPU Stack, System Interrupt Vectors and Variables. The remaining RAM is
free for whatever use.

## X16 Memory Control

### 0000h - Current RAM Bank (R/W)
```
Bit
7-0     Banked RAM bank number
```

### 0001h - Current ROM Bank (R/W)
```
Bit
7-0     System ROM bank number / ROMBx pin output
```

Note that the actual values of these two registers are external to the RAM and
can have different values on power-up. However, they are written by the system
on boot and become consistent at user program execution.

## X16 VERA Memory Access

### 9F20h - ADDR_L - VRAM Address (lower 8 bits) (R/W)
### 9F21h - ADDR_M - VRAM Address (middle 8 bits) (R/W)
### 9F22h - ADDR_H - VRAM Address (upper 1 bit) and Increment Mode (R/W)
```
Bit
7-4     Address Step Size (see below)
3       Address Step Direction (0=Increment, 1=Decrement)
2-1     Not Used
0       Upper 1 bit of VRAM Address
```
Address Step Size:
```
0h=0
1h=1
2h=2
3h=4
4h=8
5h=16
6h=32   Bh=40
7h=64   Ch=80
8h=128  Dh=160
9h=256  Eh=320
Ah=512  Fh=640
```
Sets or reads a 17-bit address for addressing the 128 KiB of VRAM via DATA0 or
DATA1. These registers are multiplexed for each port which is set by ADDRSEL
bit in CTRL. Address register contents are also updated after each step
occurred from reading/writing to their respective data port register. For
details about ADDRSEL bit, see:  
[X16 VERA Control](#x16-vera-control)

### 9F23h - DATA0 - VRAM Data Port 0 (R/W)
### 9F24h - DATA1 - VRAM Data Port 1 (R/W)
Simply reads or writes a byte at the set address in 9F20h-9F22h of their
respective ports, then steps the address once.

### Memory Content
[X16 VERA Memory and I/O Map (VRAM)](#x16-vera-memory-and-io-map-vram)  

## X16 YM2151 Access

Due to the chip's large address space for writing and low pin count, its write
address and data pins are multiplexed. Then, an address/data select pin is
provided. X16 connects this pin to the lowest address pin as usual.
Providing I/O ports to the chip's registers.

For more information about this chip and its registers, see:  
[YM2151 FM Operator Type-M (OPM)](#ym2151-fm-operator-type-m-opm)  

### 9F40h - YM2151 Register Address (W)
Sets the chip's register address.

### 9F41h - YM2151 Register Data (W)
Writes to the chip at the currently set register address. Writes here will not
do any address auto-steps.

### 9F4xh - YM2151 Status (R)
Reads from the chip will always return this status byte no matter what the
currently set register address is. Note that the chip ignores the address/data
select pin for this so this byte can be read from either 9F40h or 9F41h.
```
Bit
7       Busy Flag (1=Busy)
6-2     Not Used
1       Timer B Overflow (0=No Overflow, 1=Overflow)
0       Timer A Overflow (0=No Overflow, 1=Overflow)
```
Any successful writes to the register data will set a busy flag for 64 clock
cycles (about 144 CPU cycles since the chip runs slower), indicating that any
other writes shouldn't be done during this period. Setting the register
address won't set and isn't affected by this busy flag, however.

### YM2151 and 2MHz I/O Access Clock Stretching
Due to timing constraints from a faster CPU, there's an additional circuitry
which temporarily slows down the CPU by 4 times every time its address output
is in 9F40h-9F5Fh and 9FA0h-9FFFh (IO3,6,7,8 pins physically). This is to make
sure reads/writes to the slower I/O interface are always successful. In other
words, reading/writing to it has an extra 3-cycle wait per instruction (6
cycles for RMW instructions).

## X16 System ROM Flash Access

X16's System ROM is a flash memory which can be erased and programmed with a
new data. Providing that the physical write enable jumper to it is connected.
This is used for updating the system firmware and software from an external
memory without powering off the machine. Like any NOR flash memory, a special
write command sequence is needed. The following sub-sections describe possible
command write sequences. Note that addresses are in ROM bank:CPU address format
due to how the ROM is connected - they are internally 5555h and 2AAAh.

### Flash Detection
```
(01:D555h)=AAh
(00:EAAAh)=55h
(01:D555h)=90h  ; enter software ID mode
X=(00:C000h)    ; manufacturer ID
Y=(00:C001h)    ; device ID
(01:D555h)=AAh
(00:EAAAh)=55h
(01:D555h)=F0h  ; exit software ID mode
```
X and Y values depend on the ROM chip used on the board, possible values are:
```
X   Y   Chip
BFh B7h SST39SF040
```

### Erase Entire Chip
```
(01:D555h)=AAh
(00:EAAAh)=55h
(01:D555h)=80h
(01:D555h)=AAh
(00:EAAAh)=55h
(01:D555h)=10h
repeat X=(01:D555h) until X==FFh
```

### Erase 4 KiB Sector
```
(01:D555h)=AAh
(00:EAAAh)=55h
(01:D555h)=80h
(01:D555h)=AAh
(00:EAAAh)=55h
(nn:n000h)=30h
repeat X=(nn:n000h) until X==FFh
```

### Program Byte
The 4 KiB sector where the destination address exist must be fully erased
before programming
```
for i=first to last
    (01:D555h)=AAh
    (00:EAAAh)=55h
    (01:D555h)=A0h
    (nnnnnn+i)=data[i]
    repeat X=(nnnnnn+i) until X==data[i]
next i
```


# X16 Versatile Embedded Retro Adapter (VERA)

[X16 VERA Control](#x16-vera-control)  
[X16 VERA Display Composer](#x16-vera-display-composer)  
[X16 VERA Layer Control](#x16-vera-layer-control)  
[X16 VERA Interrupts](#x16-vera-layer-control)  
[X16 VERA Audio FIFO](#x16-vera-audio-fifo)  
[X16 VERA Memory Card Interface](#x16-vera-memory-card-interface)  

### Embedded Memory
[X16 VERA Memory and I/O Map (VRAM)](#x16-vera-memory-and-io-map-vram)  
[X16 VERA Programmable Sound Generator (PSG)](#x16-vera-programmable-sound-generator-psg)  
[X16 VERA Color Palette](#x16-vera-color-palette)  
[X16 VERA Sprites](#x16-vera-sprites)  
VERA memory isn't mapped to the CPU bus, and can be accessed only via I/O
ports.  
[X16 VERA Memory Access](#x16-vera-memory-access)

### Pinouts
[X16 Audio/Video Connector Pinouts](#x16-audiovideo-connector-pinouts)  
[X16 Pinouts VERA Module](#x16-pinouts-vera-module)  
[X16 Pinouts VERA Chips](#x16-pinouts-vera-chips)  

## X16 VERA Control

### 9F25h - CTRL - Control (R/W)
```
Bit
7       Reset Adapter (1=Reset)
6-1     Display Composer Register Select (DCSEL)
0       Address Port Select (ADDRSEL)
```
Writing reset bit to this register will reset the entire adapter's operation
and initialize all registers. Current video and sound output will be lost.
In boards with a dedicated VERA chip, this operation completely resets the FPGA
which can take milliseconds to reconfigure. A detection for when it is
configured can be done by repeatedly writing a data to a register and reading
it back until it stays.

DCSEL selects which Display Composer register bank to access in location
9F29h-9F2Ch. ADDRSEL selects which port to read/write address when accessing
VERA memory from the CPU. For more information, see their respective entries:  
[X16 VERA Display Composer](#x16-vera-display-composer)  
[X16 VERA Memory Access](#x16-vera-memory-access)

### 9F29h..9F2Ch (DCSEL=63) - Version Number (R)
```
Byte 0  Always 56h ('V')
Byte 1  Major Version Number
Byte 2  Minor Version Number
Byte 3  Build Number
```
Writing 63 to DCSEL will select this read-only register. It contains a version
number information of this VERA hardware. For example, a "community release
v0.1.1" FPGA configuration contains bytes 56h 00h 01h 01h in order.

## X16 VERA Display Composer

### 9F29h (DCSEL=0) - DC_VIDEO - Active Display Control (R/W)
```
Bit
7       Current Interlace Frame (0=Even, 1=Odd Frame) (Read-only)
6       Sprites (0=Disable, 1=Enable)
5       Layer 1 (0=Disable, 1=Enable)
4       Layer 0 (0=Disable, 1=Enable)
3       Interlacing (0=Enable, 1=Disable)
2       Chroma Output (no effect in RGB) (0=Enable, 1=Disable)
1       Sync Generation (0=Separate, 1=Composite)
0       Output Mode (0=Luma/Chroma, 1=RGB)
```
Notable bits 0-3 combination:
```
Mode
0       Display off
1       31.5kHz RGB 480p (VGA)
2       15.75kHz Composite 480i Color (NTSC)
3       15.75kHz RGB 480i
6       15.75kHz Composite 480i Monochrome
9       15.75kHz RGB 240p VGA Sync
10      15.75kHz Composite 240p Color
11      15.75kHz RGB 240p Composite Sync
14      15.75kHz Composite 240p Monochrome
```
VERA natively outputs in a progressive RGB format with a line rate of 31.5kHz.
Which the system also boots in that mode by default. It is also capable of
outputting at half a line rate of 15.75kHz with or without interlacing.
However, it comes with a trade-off that every other lines will not be rendered
at all. Also, these modes have different video timings.

Luma/Chroma output can only be output in 15.75kHz modes. The adapter also has
a hardware to modulate Luma/Chroma signals into NTSC composite video. However,
most NTSC CRT TVs can only display around the middle 592x448 region. So, this
overscan should be taken into account when using composite output.

Even though interlacing is disabled in 15.75kHz modes (240p), the VERA still
alternatively outputs only odd lines and even lines in each frame as if it's
interlacing. This causes adjacent lines to be temporally blended together.

CAUTION: Enabling layers mid-screen can cause a garbage line to be displayed as
the renderer was not active to fill in a data for the current displaying line.

### 9F2Ah (DCSEL=0) - DC_HSCALE - Active Display H-Scale (R/W)
### 9F2Bh (DCSEL=0) - DC_VSCALE - Active Display V-Scale (R/W)
Scales the entire rendering output by a factor of 128/x. A value of 80h means
no scaling. This is mainly used for displaying low resolution graphics.

Scaling is done by adding this fractional H-Scale value each drawn pixel and
V-Scale value each drawn line to the virtual screen position. Then the integer
part of this virtual screen position is then used for the rest of composition
logic. This puts the scaling center at the top-left corner of an active display
area.

CAUTION: Virtual screens larger than 640x480 is not possible as the rendering
will stop if the virtual screen position is either above it horizontally or
vertically. Also, setting V-Scale above 1.0 (80h) will skip some pixels while
rendering, potentially causing inaccurate collision detection. Although this is
not a case for setting H-Scale above 1.0 (80h) as the line rendering always
runs at a native horizontal resolution.

### 9F2Ch (DCSEL=0) - DC_BORDER - Border Color (R/W)
When the drawing pixel is outside the active display area defined by start and
stop registers, it will be set to a solid color at the index of this register's
value in the palette memory. Please note that this is different from a
background color which is always color index 0.

### 9F29h (DCSEL=1) - DC_HSTART - Active Display H-Start (R/W)
### 9F2Bh (DCSEL=1) - DC_VSTART - Active Display V-Start (R/W)
Sets the starting point of an active display area in native display
coordinates. Horizontal value is in steps of 4 and vertical value is in steps
of 2. The virtual screen will always start from this point.

### 9F2Ah (DCSEL=1) - DC_HSTOP - Active Display H-Stop (R/W)
### 9F2Ch (DCSEL=1) - DC_VSTOP - Active Display V-Stop (R/W)
Sets the stopping point of an active display area in native display coordinates
(they are not scaled to DC_xSCALE values). Horizontal value is in steps of 4
and vertical value is in steps of 2. The stopping point is not inclusive.

These four register values are analogous to a display window in many consoles.
The width of an active display is `(DC_HSTOP-DC_HSTART)*4` pixels and the height
of an active display is `(DC_VSTOP-DC_VSTART)*2` pixels. For example, a screen
that starts at (64,50) with an active display size of 320x200 pixels will
have 9F29h-9F2Ch values of 10h, 19h, 60h, 7Dh in order.

## X16 VERA Layer Control

### 9F2Dh - L0_CONFIG - L0 Mode and Map Size (R/W)
### 9F34h - L1_CONFIG - L1 Mode and Map Size (R/W)
```
Bit
7-6     Map Height (0=32, 1=64, 2=128, 3=256 tiles)
5-4     Map Width (0=32, 1=64, 2=128, 3=256 tiles)
3       1bpp Tile Mode Color (0=16FG/16BG, 1=256FG/1BG)
2       Tile/Bitmap Mode (0=Tile Mode, 1=Bitmap Mode)
1-0     Color Depth (0=1bpp, 1=2bpp, 2=4bpp, 3=8bpp)
```
1bpp Tile Mode Color (bit 3) setting is valid only if the layer is set to that
mode (bits 0-2 are all zero). The map will wrap around if the screen draws
beyond its width or height.

### 9F2Eh - L0_MAPBASE - L0 Map Base (R/W)
### 9F35h - L1_MAPBASE - L1 Map Base (R/W)
Specifies the map base address in 512-byte steps. In bitmap mode, this has no
effect.

### 9F2Fh - L0_TILEBASE - L0 Tile Base and Tile Size (R/W)
### 9F36h - L1_TILEBASE - L1 Tile Base and Tile Size (R/W)
```
Bit
7-2     Tile / Bitmap Base Address in VRAM (in 2-KiB steps)
1       Tile Height (0=8, 1=16 pixels)
0       Tile Width (0=8, 1=16 pixels) / Bitmap Width (0=320, 1=640 pixels)
```

### 9F30h/9F31h - L0_HSCROLL_L/L0_HSCROLL_H - L0 Horizontal Scroll (R/W)
### 9F37h/9F38h - L1_HSCROLL_L/L1_HSCROLL_H - L1 Horizontal Scroll (R/W)
```
Bit
15-12   Not Used
11-0    Horizontal Scroll (Tile Mode)
11-8    Palette Number (Bitmap Mode)
```
In bitmap mode, horizontal scroll has no effect.

### 9F32h/9F33h - L0_VSCROLL_L/L0_VSCROLL_H - L0 Vertical Scroll (R/W)
### 9F39h/9F3Ah - L1_VSCROLL_L/L1_VSCROLL_H - L1 Vertical Scroll (R/W)
```
Bit
15-12   Not Used
11-0    Vertical Scroll
```
In bitmap mode, this has no effect.

## X16 VERA Interrupts

### 9F26h - IEN - Interrupt Enable / Current Line Number (upper 1 bit) / Line Compare (upper 1 bit) (R/W)
```
Bit
7       Interrupt Line Compare (upper 1 bit) (Write-only)
6       Current Line Number (upper 1 bit) (Read-only)
5-4     Not Used
3       FIFO Low IRQ (0=Disable, 1=Enable)
2       Sprite Collide IRQ (0=Disable, 1=Enable)
1       Line IRQ (0=Disable, 1=Enable)
0       VBlank IRQ (0=Disable, 1=Enable)
```
For details about Line Compare/Number bits, see IRQLINE_L (9F28h) entry.

### 9F27h - ISR - Interrupt / Status Register (R/W)
```
Bit
7-4     Sprite Collisions (Read-only)
3       FIFO Low IRQ Flag (0=None, 1=Interrupt Request) (Read-only)
2       Sprite Collide IRQ Flag (0=None, 1=Interrupt Request)
1       Line IRQ Flag (0=None, 1=Interrupt Request)
0       VBlank IRQ Flag (0=None, 1=Interrupt Request)
```
FIFO Low IRQ is generated once the buffer is less than 1024 bytes in size and
its flags remain set until the buffer is larger than or equal to 1024 bytes.

Sprite Collide IRQ is generated at VBlank when a sprite collision occurs. Its
flags and Sprite Collisions field remain set until the next VBlank. For details
about sprite collision bits, see:  
[X16 VERA Sprites](#x16-vera-sprites)

Line IRQ is generated at the beginning of the display line that matches the
line compare value. Its flags are not automatically cleared.

VBlank IRQ is generated at the beginning of VBlank period (the line after the
last display line). Its flags are not automatically cleared.

All of the 4 flags get set even if their respective interrupts are disabled.
Writing a bit 1 to one of the bits 0-2 will clear that interrupt status.

### 9F28h - SCANLINE_L - Current Line Number (lower 8 bits) (R)
### 9F28h - IRQLINE_L - Interrupt Line Compare (lower 8 bits) (W)

When read, returns the current *display* line number. When write, Specifies the
*display* line number to generate IRQ at. This number is neither scaled
with the DC_VSCALE register nor offset with the DC_VSTART register. In
interlaced mode, bit 0 is fixed to the current odd/even field value when read
and is ignored when write - it will generate IRQ in both two frames even
if that line is skipped in either field of the display. Line comparison is only
done on drawing lines which means a value higher than 479 will never generate
Line IRQs. Also for lines 512-525 (during VBlank), this is always read 511.

CAUTION: Since VERA renders to a line buffer first then read it out to the
screen in the next line, changes made to layer settings and VRAM will not be
visible until the next line. This does not apply to display composer settings
and palette data as they will take effect immediately. Keep this in mind when
doing raster effects.

## X16 VERA Audio FIFO

### 9F3Bh - AUDIO_CTRL - Audio FIFO Control (R/W)
```
Bit
7       FIFO Full (R) / FIFO Reset (1=Reset) (W)
6       FIFO Empty (Read-only)
5       FIFO Sample Size (0=8-bit, 1=16-bit)
4       FIFO Sample Channels (0=Mono, 1=Stereo)
3-0     FIFO Output Volume (0=Silent, 15=Loudest)
```
Writing reset bit to this register will empty the current buffer. The output
volume is not linear and has the meaning as follows:
```
0h=0    1h=16   2h=32   3h=48   4h=64   5h=80   6h=96   7h=128
8h=176  9h=224  Ah=384  Bh=368  Ch=480  Dh=608  Eh=784  Fh=1024
```
NOTE: All values can be approximated as 2.2 dB steps, and are relative to PSG's
output level.

### 9F3Ch - AUDIO_RATE - Audio FIFO Sample Rate (R/W)
Specifies the playback rate of the FIFO in `25000*n/65536` KHz.
A value of 0 will stop playback. Values higher than the maximum 128 is invalid and
effectively equals to 256-n.

### 9F3Dh - AUDIO_DATA - Audio FIFO Data (W)
Writes one byte to the FIFO and increases the current buffer size by one. Any
writes will be ignored if the current buffer size is over 4095 bytes
(indicated by bit 7 in AUDIO_CTRL). The data needs to be written depends on the
current bit 4-5 setting in AUDIO_CTRL as follows:
```
AUDIO_CTRL      Data Format
8-bit Mono      [Signed 7:0]
8-bit Stereo    [Signed Left 7:0] [Signed Right 7:0]
16-bit Mono     [7:0] [Signed 15:8]
16-bit Stereo   [Left 7:0] [Signed Left 15:8] [Right 7:0] [Signed Right 15:8]
```
When the FIFO is active, it will regularly retrieve the oldest sample in the
buffer as the name implies (First In, First Out), and output at a rate defined
in AUDIO_RATE register. And then decreases the buffer size. Once the buffer
size is lower than 1024 bytes it will generate FIFO Low IRQ if it's enabled and
set its flag until the buffer size is higher than or equal to 1024 bytes. If it
is unable to retrieve a new sample from an empty buffer, the output will be set
to 0.

## X16 VERA Memory Card Interface

VERA uses an SPI bus, which is a 4-wire serial bus to communicate and transfer
data with the memory card. It uses SPI Mode 0 for clock and data signals. Its
interface is quite bare and can be adapted to any SPI device. This is the only
interface with automatic clocking and transfer in X16.

### 9F3Eh - SPI_DATA - SPI Data (R/W)
Reads from this register returns the last received byte. Writes to this
register will start transferring one byte of written data to the device and
receiving one byte of data from the device at the same time. The busy flag in
SPI_CTRL is set during the transfer period. Once the transfer completes, the
busy flag is cleared and the new received byte is latched to this register.
Since the VERA is on the controller side and due to how SPI works, it's usually
required to write to this register many times to shift out dummy clocks until
the desired data from the device is received and latched.

### 9F3Fh - SPI_CTRL - SPI Control (R/W)
```
Bit
7       Busy Flag (1=Busy) (Read-only)
6-4     Not Used
3       Auto Transfer (0=Off, 1=On) (undocumented)
2       Not Used
1       Shift Clock Speed (0=12.5MHz, 1=391KHz)
0       Chip Select (0=Release, 1=Select)
```
A shift clock speed of 391KHz was implemented because some memory cards require
it to be lower than 400KHz during an initialization process. A chip select is
required in order to activate the memory card.

When Auto Transfer is on, any reads from SPI_DATA will also transfer FFh to the
device and receive one byte of data from it at the same time.

### Memory Card Commands
The memory card takes a 6-byte command and arguments as shown below:
```
Byte 0
  Bit 7     Start Bit, always 0
  Bit 6     Transmission Bit, always 1
  Bit 5-0   Command Index
Byte 1-4    Command Argument
Byte 5
  Bit 7-1   CRC-7 (09h Polynomial)
  Bit 0     Stop Bit, always 1
```
NOTE: SPI mode disables all CRCs by default. However, commands 00h and 08h are
of native mode and still requires it.

The below is a partial list of commands that are usually used for basic card
initialization and data transfer, all reserved bits should always be 0:
```
Command Arguments (Big Endian)  Resp.   Explanation
00h     31-0  Stuff             R1      Reset the memory card to idle state
01h     31-0  Stuff             R1      Initialize the memory card (MMC only)
08h     31-12 Reserved          R7      Check voltage range (added later in
        11-8  Supply Voltage            SD v2 spec, used to detect newer cards)
         7-0  Check Pattern     
0Ch     31-0  Stuff             R1b     Force the memory card to stop
                                        transmission in Read Multiple Blocks
                                        operation.
0Dh     31-0  Stuff             R2      Read the status register
10h     31-0  Block Length      R1      Set block length (always fixed to 512
                                        bytes in SDHC/SDXC)
11h     31-0  Data Address*     R1      Read a block of data
12h     31-0  Data Address*     R1      Read multiple blocks until stop command
18h     31-0  Data Address*     R1      Write a block of data
19h     31-0  Data Address*     R1      Write multiple blocks until stop token
37h     31-0  Stuff             R1      Tell the memory card that the next
                                        command is an application(SD)-specific
                                        command. Used in next two commands:
37h 17h 31-23 Stuff             R1      Set the number of write blocks to be
        22-0  Number of Blocks          pre-erased before writing for faster
                                        Write Multiple Blocks operation
37h 29h 31    Reserved          R1      Send host capacity support information
        30    Host Capacity             (0=SDSC, 1=SDHC/SDXC) and initialize
        29-0  Reserved                  the memory card
3Ah     31-0  Stuff             R3      Reads the OCR register (see below)
3Bh     31-1  Stuff
        0     CRC (0=Off, 1=On) R1      Turns CRC on or off
```
<small>* In bytes for MMC/SDSC, in 512-byte blocks for SDHC/SDXC</small>


When a command is sent, after certain delay bytes (write to 9F3Eh until read
isn't FFh), the memory card will send response bits back. The format depends on
the command as described in the above table. Response R1b is response R1 with
optional trailing busy signal where the memory card pulls the data line low
(reads are not FFh like on release). Bytes in all tables below are big endian.

Response R1
```
Bit
7       Always 0
6       Parameter Error
5       Address Error
4       Erase Sequence Error
3       CRC Error
2       Illegal Command
1       Erase Reset
0       In Idle State
```
Response R2 (Status Register)
```
Bit
15-8    Same as R1
7       Out of Range/CSD overwrite
6       Erase Parameter
5       Write Protect Violation
4       Card ECC failed
3       Card Controller Error
2       Generic Error
1       Write Protect Erase Skip/(Un)lock Command Failed
0       Card is Locked
```
Response R3 (OCR Register)
```
Bit
39-32   Same as R1
31      Card Power-up Status (0=Powering Up, 1=Normal)
30      Card Capacity Status (0=MMC/SDSC, 1=SDHC/SDXC)
29-24   Reserved
23-0    Voltage Window
```
Response R7
```
Bit
39-32   Same as R1
31-28   Command Version
27-12   Reserved
11-8    Voltage Accepted
7-0     Check Pattern Echo
```

### Memory Card Initialization
After power on or memory card insertion, wait for at least 1 ms. Set shift
clock speed to slow speed (bit 1 of 9F3Fh is set). Chip release the memory card
then write at least 10 bytes of data to apply clock pulses. It is now operating
in native mode. To change it to SPI mode or resetting it, chip select it back
and send a command 00h. It is now in SPI mode with idle state.

In idle state, only commands 00h, 01h, 08h, 37h 29h, 3Ah and 3Bh are accepted.
To initialize the card and exit idle state, send a command 08h to detect
newer SD (this command does not exist in older MMC/SDSC) then repeatedly send a
command 37h 29h (or 01h in case of illegal command) until idle state bit in the
response is cleared. Now the memory card is fully initialized and able to run
at full shift clock speed. OCR register can now be read to determine the memory
card's capacity.

### Memory Card Data Transfer
The memory card sends and takes a data in packets. The packet consists of a 1-byte token, a data block with a size of the current block length setting and a 2-byte CRC-16-CCITT (1021h Polynomial). There are delays between each data packets which needs to be clocked.

Single Block Read (Token=FEh)
```
      __ _________ _______________________
Write   |_CMD 11h_| 
      _______________ __ ____ ________ ___
Read                 |R1|    |_Packet_|
```
Multiple Blocks Read (Token=FEh)
```
      __ _________ _____________________________  __ _________ ________________
Write   |_CMD 12h_|                            / /  |_CMD 0Ch_|
      _______________ __ ____ ________ ____ ___/ /__ ____ ____ __ __        ___
Read                 |R1|    |_Packet_|    |_Pa/ /t_|    |_Pac|  |R1|_Busy_|
```
If reading fails, the memory card will send a following 1-byte data error token
instead of a data packet:
```
Bit
7-4     Always 0
3       Out Of Range
2       Card ECC failed
1       Card Controller Error
0       Generic Error
```

Single Block Write (Token=FEh)
```
      __ _________ ________ ________ _____________
Write   |_CMD 18h_|        |_Packet_|
      _______________ __ ___________ __        ___
Read                 |R1|           |DR|_Busy_|
                       ->  <- 1+ bytes
```
Multiple Blocks Write (Token=FCh)
```
      __ _________ ________ ________ ____________ ____  _______________________
Write   |_CMD 19h_|        |_Packet_|            |_Pa/ /       |FDh|
      _______________ __ ___________ __        ______/ /      ______        ___
Read                 |R1|           |DR|_Busy_|      / /Busy_|      |_Busy_|
                       ->  <- 1+ bytes                            -> <- 1 byte
```
Each written packet will make the memory card send a data response token (DR)
back in the next byte, this 1-byte token has a following format:
```
Bit
7-5     Not Used
4       Always 0
3-1     Status (2=Data Accepted, 5=CRC Error, 6=Write Error)
0       Always 1
```

### VERA Configuration Flash Access
In boards with a dedicated VERA chip, there is a jumper to permanently enable
an accesss to the configuration flash memory during a normal operation. This
allows VERA FPGA's configuration to be reprogrammed in-system through the same
SPI interface. However, SPI flash memory have different commands from memory
cards and the topic of programming it is outside of this document's scope.

## X16 VERA Memory and I/O Map (VRAM)

### VERA Memory Map
```
Offset          Content
00000h-1F9BFh   Video RAM
1F9C0h-1F9FFh   PSG Registers
1FA00h-1FBFFh   Color Palette
1FC00h-1FFFFh   Sprite Attributes
```
All of VERA I/O registers at 1F9C0h-1FFFFh are write-only and external to the
VRAM. Any writes will set both it and the VRAM at that location but reads will
only read back that VRAM content. Since the VRAM can have different values than
the actual register values on power-up and most of them are never initially
written to be consistent by the system on boot, it's required to initialize
those values first on start-up so any further reads will be consistent with
actual values.

### Tile Map
Each tile map entry consists of a 16-bit value as such:
```
Bit
15-12   Palette Number (0-15)
11      V-flip (0=Normal, 1=Mirror vertically)
10      H-flip (0=Normal, 1=Mirror horizontally)
9-0     Character Number (000h-3FFh)
```
In 1bpp tile mode, the entries are different depending on bit 3 of Lx_CONFIG
register. This bit controls how foreground and background colors are assigned.
If it is set to 0:
```
Bit
15-12   Background Color (0-15)
11-8    Foreground Color (0-15)
7-0     Character Number (00h-FFh)
```
If it is set to 1:
```
Bit
        Background Color (0)
15-8    Foreground Color (0-255)
7-0     Character Number (00h-FFh)
```

### Tile Data (Layers and Sprites)
VERA strictly uses packed pixel format in every color depth setting. Its
smallest 8x1 "bars" unit can be described as follows:
```
   Byte 0        1        2        3        4        5        6        7
    Bit 76543210 76543210 76543210 76543210 76543210 76543210 76543210 76543210
1bpp    abcdefgh
2bpp    aabbccdd eeffgghh
4bpp    aaaabbbb ccccdddd eeeeffff gggghhhh
8bpp    aaaaaaaa bbbbbbbb cccccccc dddddddd eeeeeeee ffffffff gggggggg hhhhhhhh
Depth
```
For each bar, the color ID for each pixel A to H from left to right are packed
together from left to right. The bit length of each color ID depends on the
color depth setting. Making each bar occupy 1, 2, 4 or 8 bytes total. A color
ID of 0 always mean transparent pixels.

To make up tiles which can be up to 16x16 pixels in size for Layers, and up to
64x64 for sprites, each bars are combined as follows. With X being a tile width
in pixels divided by 8 and Y being a tile height in pixels. For example, a tile
size of 32x16 pixels has X=4 and Y=16.
```
Vertical Rows       Left-most    ...     Right-most
Upper Row   in bars    0,      1,      2, ...,  X-1
2nd Row     in bars    X,    X+1,    X+2, ..., 2X-1
...
Yth Row     in bars XY-X, XY-X+1, XY-X+2, ..., XY-1
```

### Bitmap Data
In bitmap mode, the bitmap data format is the same as the tile data format with
a tile width of 320 or 640 pixels (depending on bit 0 of Lx_TILEBASE register)
and a tile height of 480 pixels.

### Accessing VRAM
[X16 VERA Memory Access](#x16-vera-memory-access)

## X16 VERA Programmable Sound Generator (PSG)
VERA contains registers for its 16-channel programmable sound generator mapped
to the location of 1F9C0h in VRAM.
It contains a 4-byte entry for each of 16 channels:
```
Byte 0-1    Frequency; 25000000*n/2^26 Hz (0-65535)
Byte 2
  Bit 7     Output to Right Channel
  Bit 6     Output to Left Channel
  Bit 5-0   Volume (0=Silent, 63=Loudest)
Byte 3
  Bit 7-6   Waveform (0=Pulse, 1=Sawtooth, 2=Triangle, 3=Noise)
  Bit 5-0   Pulse Width (0-63)
```

### Volume
The output volume is not linear and has the meaning as follows:
```
00h=0   04h=16  10h=33  1Ch=67  28h=135 34h=271
        05h=17  11h=35  1Dh=71  29h=143 35h=287
        06h=19  12h=38  1Eh=76  2Ah=152 36h=304
        07h=20  13h=40  1Fh=80  2Bh=161 37h=322
        08h=21  14h=42  20h=85  2Ch=170 38h=341
        09h=22  15h=45  21h=90  2Dh=181 39h=362
        0Ah=23  16h=47  22h=95  2Eh=191 3Ah=383
        0Bh=25  17h=50  23h=101 2Fh=203 3Bh=406
        0Ch=26  18h=53  24h=107 30h=215 3Ch=430
01h=14  0Dh=28  19h=57  25h=114 31h=228 3Dh=456
02h=15  0Eh=30  1Ah=60  26h=120 32h=241 3Eh=483
03h=16  0Fh=32  1Bh=64  27h=128 33h=256 3Fh=512
```
NOTE: All values can be approximated as 0.5 dB steps.

### Waveform
For pulse waveform, an additional pulse width value w is used as a duty cycle.
A value of 63 will give an exact square wave with a 50% duty cycle. A value of
0 will give a ~0.8% duty cycle pulse. The pulse waveform is likely implemented
as follows:

```
   _______           __
  |       |         |
__|       |_________|
 7 000       7777777 0
 F 012...w...9ABCDEF 0  Pulse cycle#
```
Noise generation uses a 16-bit LFSR which runs at every master clock cycle. The
output of this is then shifted into a 6-bit buffer which will be latched onto
each channel on its frequency cycle and used as an output. The LFSR and buffer
are updated as follows:
```
buffer = (buffer SHL 1) OR (lfsr.Bit0)
lfsr = (lfsr SHL 1) OR (lfsr.Bit1 XOR lfsr.Bit2 XOR lfsr.Bit4 XOR lfsr.Bit15)
```

## X16 VERA Color Palette

### Color Palette Entries
VERA contains the data for 256 colors mapped to the location of 1FA00h in VRAM.
It contains a 2-byte entry for each of 256 colors:
```
Bit
15-12   Not Used
11-8    Red
7-4     Green
3-0     Blue
```

### Color Palette Indices
```
00h      Background Color (used when all Layer/Sprite pixels are transparent)
01h-FFh  256-color Palette (1bpp mode and 8bpp mode)
01h-FFh  Sixteen 16-color Palettes (2bpp mode uses first four colors each)
```
NOTE: Due to a hardware quirk, a palette number entry will also modify the
first 16 colors mapping in 8bpp mode as if it was 4bpp mode. So it is
recommended to set the palette number to 0 to still have access to all 256
colors.

### Initial Palette
On reset (by either on hardware or a write to CTRL), the internal palette
memory is initialized to these values. It consists of 16 pre-defined colors,
16 gray ramp colors and 224 8x4x7 HSL ramp colors:
```
    x0h x1h x2h x3h x4h x5h x6h x7h x8h x9h xAh xBh xCh xDh xEh xFh
0xh 000 FFF 800 AFE C4C 0C5 00A EE7 D85 640 F77 333 777 AF6 08F BBB
1xh 000 111 222 333 444 555 666 777 888 999 AAA BBB CCC DDD EEE FFF
2xh 211 433 644 866 A88 C99 FBB 211 422 633 844 A55 C66 F77 200 411
3xh 611 822 A22 C33 F33 200 400 600 800 A00 C00 F00 221 443 664 886
4xh AA8 CC9 FEB 211 432 653 874 A95 CB6 FD7 210 431 651 862 A82 CA3
5xh FC3 210 430 640 860 A80 C90 FB0 121 343 564 786 9A8 BC9 DFB 121
6xh 342 463 684 8A5 9C6 BF7 120 241 461 582 6A2 8C3 9F3 120 240 360
7xh 480 5A0 6C0 7F0 121 343 465 686 8A8 9CA BFC 121 242 364 485 5A6
8xh 6C8 7F9 020 141 162 283 2A4 3C5 3F6 020 041 061 082 0A2 0C3 0F3
9xh 122 344 466 688 8AA 9CC BFF 122 244 366 488 5AA 6CC 7FF 022 144
Axh 166 288 2AA 3CC 3FF 022 044 066 088 0AA 0CC 0FF 112 334 456 668
Bxh 88A 9AC BCF 112 224 346 458 56A 68C 79F 002 114 126 238 24A 35C
Cxh 36F 002 014 016 028 02A 03C 03F 112 334 546 768 98A B9C DBF 112
Dxh 324 436 648 85A 96C B7F 102 214 416 528 62A 83C 93F 102 204 306
Exh 408 50A 60C 70F 212 434 646 868 A8A C9C FBE 211 423 635 847 A59
Fxh C6B F7D 201 413 615 826 A28 C3A F3C 201 403 604 806 A08 C09 F0B
```
![Initial palette colors arranged in a 16x16 grid as an above table](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAJgUlEQVR42u3YYXUUSxCG4Z57MNBIqJbQkbCRcFdCkAASshKIBJAAElgLSCAS5orYH9/l1PMYqKnuneQ9c4wxzhF0ntHx43Yc0fl1/snOf/4dnf/0ehvZB/g3Ov7Pn3t0/vtb9v5vP79H53/dn7M/v58/o/Mvl0t0/n59j86/3r5G5//Y2fv/ZwAA7QgAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAjzvGGGfyAeacw3zzzTfffPPN9wUAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAEAAAgAAEAAAAACAAAQAACAAAAA/vc+1JzRB6iq7Pzu+zc//x3ef12vvX//5kfnz+b7r9ut9f6+AABAQwIAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAADA446XOc/kA9Sc0QOo8AWk99/h/df93vv+zW89P/7+Vfjvb1V4fu/9fQEAgIYEAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAgMcd3769nskHqJrRA9hV0flrXUfn8ze/9/wdnr+ebs3vP/sPqGbz/cP37wsAADQkAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAADzuOH/tM/kA6/kePYCq7AXUHL33b37+O7z/x08zfP8Vnt99/+bnH34Bn9bVFwAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAIAAAAAEAAAgAAEAAAAACAAD42xz7UmfyAWbN6AFU8/nx89/Z+dd1633+NVrvP8P7x9//nd3/y7q3vv/0fF8AAKAhAQAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAOBxx+V1nMkHmJU9gPj8nZ3/tmZ0flWF77/C+zv/6P47O/+6nsPnP1vff37/7HxfAACgIQEAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAADgccfLr9cz+QBzz+gB3Nan6PxZ2f1HeL79w/uH37/7emt9/6OG/Tvvv30BAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAACAAAQAACAAAAABAAAIAAAgL/OMavO5ANUVfQAZnh+NZ8fP/+9o/Ova7U+f/Obzw+/f7fm758vAADQkAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAADwuGO+vJzJB5hV2RMIz4/vv3d0/H2t1vdvfvP54fdvflzh4+/997dmdr4vAADQkAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAADwuA+f6xJ9gFkVnV+1o/Ovzyt7/jN7/jv9+wvvP0fz+e/Z9+/21Pv9GzP7/r2Hf3/v79V6f18AAKAhAQAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAABAAAIAAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAAAEAAAgAAOBxx345z+QD3N9W9gRmha+g7N96/51d/3f2/avKnn+F7z++f/vzz75/T9fs++cLAAA0JAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAA87th1OZMPMGdFD6Caz8+f/47Ov95W7/MfvX9/czR//0f2/ftyX63vPz3fFwAAaEgAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAABAAAIAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAeNxxGa9n8gHmqNF7/o7O/z5XdH5V9vxrVu/9m5//Du+/rqv37998XwAAAAEAAAgAAEAAAAACAAAQAACAAAAABAAAIAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAgAAAAAQAACAAAAABAAAIAADgb3P8evlxJh9gz4oewLo9RedXeP8a4flzNt8/O3+H91/35973P5r//puff/r98wUAABoSAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAAAAAQAACAAAQAAAAAIAABAAAIAAAAAEAAAgAABAAAAAAgAAEAAAgAAAAAQAACAAAAABAAAIAABAAAAAAgAAEAAAgAAAAB73H2plkcYNKQbDAAAAAElFTkSuQmCC)

### Screen Border Color
[X16 VERA Display Composer](#x16-vera-display-composer)  

## X16 VERA Sprites

### Sprite Attributes
VERA contains the data for 128 sprites mapped to the location of 1FC00h in
VRAM. The total size is 1024 bytes which extends to the end of VRAM at 1FFFFh.
It contains an 8-byte entry for each of 128 sprites:
```
Byte 0-1
  Bit 15    Color Depth (0=4bpp, 1=8bpp)
  Bit 14-12 Not Used
  Bit 11-0  Base Address (in 32-byte steps)
Byte 2-3    X-Coordinate (upper 6 bits are ignored) (-384..639)
Byte 4-5    Y-Coordinate (upper 6 bits are ignored) (-512..511)
Byte 6
  Bit 7-4   Collision Mask
  Bit 3-2   Enable / Priority Relative to Layers
              0 = Sprite disabled
              1 = Sprite between background and layer 0
              2 = Sprite between layer 0 and layer 1
              3 = Sprite in front of layer 1
  Bit 1     V-flip (0=Normal, 1=Mirror vertically)
  Bit 0     H-flip (0=Normal, 1=Mirror horizontally)
Byte 7
  Bit 7-6   Sprite Height (0=8, 1=16, 2=32, 3=64 pixels)
  Bit 5-4   Sprite Width (0=8, 1=16, 2=32, 3=64 pixels)
  Bit 3-0   Palette Number (0-15)
```

### Sprite Collision
VERA has a feature where sprite collisions can be detected automatically on
hardware while rendering. It does this by having a collision buffer in addition
to a render buffer in a line. Each time a non-transparent pixel of a sprite is
being drawn to the buffer, it will compare the collision mask bit field between
of that sprite and the buffer. A collision is marked if one of bit positions
match. The implementation pseudocode is as follows:
```
For each frame:
    cflag := 0
    Set all Collision buffer to 0
    For each sprite:
        If a non-transparent pixel is being drawn:
            cflag |= Collision buffer at target pixel & sprite's collision mask
            Collision buffer at target pixel |= sprite's collision mask
    ISR[7:4] = cflag
    If cflag != 0 and Sprite Collide IRQ is enabled:
        Generate Sprite Collide IRQ
```
Bits 4-7 of ISR and the Sprite Collide IRQ is only updated and generated once
per frame at the beginning of the VBlank.

CAUTION: Collisions are only detected on sprites that are actually drawn. This
can be problematic when sprites are off the 640-pixel line buffer or per-line
limit is reached or the line it's being drawn is skipped from a V-Scale value
of more than 1.0 or an interlaced mode. Also, priority settings have no effect
on the collision detection which means that *disabled* sprites that are
successfully "drawn" can still contribute to it.

### Sprite Priority to Other Sprites
When sprites are on the same priority (byte 6 bits 2-3 in attribute), the
sprite attribute memory location dictates the order in which sprites to be
displayed on top. A sprite will always display on top of the other sprites that
have their attribute entries following its. Thus making sprite #0 has the
highest priority and sprite #127 has the lowest priority.

### Maximum Number of Sprites per Line
The total available sprite rendering cycles per line are 798, *regardless of
any video mode*, as sprite lookup will not continue after this amount of cycles
has been elapsed since the start of the line. If the lookup succeeds and there
are enough cycles left in the line, the sprite can be fully drawn.

The required rendering cycles and VRAM accesses per sprite are as follows:
```
Depth       Cycles                    VRAM accesses
            8px   16px  32px  64px    8px   16px  32px  64px    Sprite Width
4bpp        10    19    37    73      1     2     3     4
8bpp        11    21    41    81      2     4     6     8
<disabled/
not on line>          1                        0
```
Under best circumstances, up to 80 sprites (with no other layers displayed and
all of sprites are 4bpp 8x8) can be displayed per screen line. The maximum
number of sprites per line is also affected by off-screen sprites. To avoid
this, either move displayed sprites to the beginning of the attribute memory or
set a priority of 0 (disabled) to undisplayed sprites.

Additionally, it is also depends on how the video is currently displayed and if
the CPU is causing reads/writes to VRAM. As the VRAM runs at the same master
clock frequency and has only one 32-bit bus which is arbitrated by a 4:1 bus
multiplexer. Since sprites have the least priority in accessing VRAM, CPU
accesses and Layer rendering can stall their VRAM accesses during rendering and
further increase rendering cycles amount.

The required VRAM accesses per CPU accesses are as follows:
```
Register    Read  Write
ADDR_x      0     1
DATAx       1     2
Others      0     0
```
The required VRAM accesses per layer are as follows:
```
Depth       Tile Width /  Bitmap Width
            8px   16px    320px 640px
1bpp        160   80      20    20
2bpp        160   80      40    40
4bpp        160   120     80    80
8bpp        240   200     160   160
```
NOTE: Layer rendering is not active and will not access VRAM when it's disabled
in DC_VIDEO


# X16 Peripherals

This section describes all interfaces and peripherals external to the X16.

[VIA Connections](#via-connections)  
[X16 Joypad Interface (SNES Controllers)](#x16-joypad-interface-snes-controllers)  
[X16 Serial Bus Interface (Commodore Disk Drives/Printers)](#x16-serial-bus-interface-commodore-disk-drivesprinters)  
[X16 SMC PS/2 Interface (Keyboard/Mouse)](#x16-smc-ps2-interface-keyboardmouse)  
[X16 VERA Memory Card Interface](#x16-vera-memory-card-interface)  

## VIA Connections

X16 uses a VIA chip for general purpose I/O and timers. These provide the
rest of interfaces not covered by VERA. This chip runs at the system clock
(PHI2 input is connected to it) and can be accessed from the CPU bus. For
details about the chip itself and its registers, see:  
[VIA Versatile Interface Adapter](#via-versatile-interface-adapter)  

Every peripheral described in this section and the I2C bus are all wired to the
VIA's I/O pins as follows. The IRQ out from this chip is connected to the NMI
line of the CPU.
```
PA0     I2C SDA
PA1     I2C SCL
PA2     Joypad Strobe (Both 2 Ports) (-> STB)
PA3     Joypad Clock (Both 2 Ports) (-> CK1/CK2)
PA4     Joypad 4 Data (Port 2) (-> IN4)
PA5     Joypad 3 Data (Port 1) (-> IN3)
PA6     Joypad 2 Data (Port 2) (-> IN2)
PA7     Joypad 1 Data (Port 1) (-> IN1)
CA1     Not Used
CA2     Not Used
PB0     Not Used
PB1     Not Used
PB2     Not Used
PB3     Serial ATN Out
PB4     Serial CLK Out
PB5     Serial DATA Out
PB6     Serial CLK In
PB7     Serial DATA In
CB1     Serial SRQ
CB2     Not Used
```
Several internal system peripherals and memory are connected to the I2C Bus.
They are described in the following section:  
[X16 I2C Bus](#x16-i2c-bus)


## X16 Joypad Interface (SNES Controllers)

X16 has 2 SNES-compatible joypad connectors for up to 4 connected joypads at
the same time. However, being connected to VIA, there is no auto-read feature
or even legacy auto-shift on read feature like in SNES. Instead, all read/write
operations have to be done manually in a bit-banging fashion.

### X16 Joypad Access
The below timing diagram shows how to read a data from joypads that use typical
Parallel-Load Shift Registers. STB is set low in order to load all parallel
inputs into the shift register. Any CLK signals during STB low will be ignored.
Once STB is set high, any rising edge of CLK signal will shift the register out
by one bit. If nothing is connected to a port, the data at that port will
be pulled up and always read 1.
```
     __       ________________________________
STB    |_____|
     ___   _   _   _   _   _   _   _   _   ___
CLK    :|_| |_| |_| |_| |_| |_| |_| |_| |_|
     __:______ ___ ___ ___ ___ ___ ___ ___ ___
JOY1 __|______|___|___|___|___|___|___|___|___
     __:______ ___ ___ ___ ___ ___ ___ ___ ___
JOY2 __|______|___|___|___|___|___|___|___|___
     __:______ ___ ___ ___ ___ ___ ___ ___ ___
JOY3 __|______|___|___|___|___|___|___|___|___
     __:______ ___ ___ ___ ___ ___ ___ ___ ___
JOY4 __|______|___|___|___|___|___|___|___|___
         1st   2nd 3rd 4th 5th 6th 7th 8th ...
```
Unlike SNES (and its predecessor NES), VIA doesn't invert joypad signals
internally. This means that any read and write data will be inverted compared
to SNES in software's point of view.

### Standard SNES Joypad Bits
```
1st         B Button        (0=Pressed, 1=Released)
2nd         Y Button        (0=Pressed, 1=Released)
3rd         Select Button   (0=Pressed, 1=Released)
4th         Start Button    (0=Pressed, 1=Released)
5th         D-Pad Up        (0=Pressed, 1=Released)
6th         D-Pad Down      (0=Pressed, 1=Released)
7th         D-Pad Left      (0=Pressed, 1=Released)
8th         D-Pad Right     (0=Pressed, 1=Released)
9th         A Button        (0=Pressed, 1=Released)
10th        X Button        (0=Pressed, 1=Released)
11th        L Button        (0=Pressed, 1=Released)
12th        R Button        (0=Pressed, 1=Released)
13th        ID Bit 3        (usually 1)
14th        ID Bit 2        (usually 1)
15th        ID Bit 1        (usually 1)
16th        ID Bit 0        (usually 1)
17th and up Padding         (always 0) (or 1 when port is not connected)
```

### Other SNES Controllers/Devices
It's possible to connect any other devices aside of SNES controllers to the
port as long as they are electrically compatible and there's a software to read
them. Although note that as seen in VIA connections section, IO6 and IO7 (Pin 6
on each of the connectors) are not connected to anything. Which means it's
impossible to interface devices that use those lines. For documentation of
devices that connect to SNES controller ports during its lifetime, see SNES
Controllers section in Fullsnes:  
http://problemkaputt.de/fullsnes.htm  
http://problemkaputt.de/fullsnes.txt


## X16 Serial Bus Interface (Commodore Disk Drives/Printers)

X16 has one connector for Commodore Serial IEEE-488 Bus (usually referred to as
IEC Bus). Which is a cheaper serial version of IEEE-488 interface used
throughout Commodore's 8-bit computers since VIC-20 for disk drives and
printers. The interface is a 3-wire serial containing ATN line which works
similarly to CS line in SPI but is also used to send special commands to
select which device to send/receive a data after this or even switch roles
around. Allowing many devices to be on a same bus.

(under construction)


# X16 I2C Bus

Aside of the main address/data bus, X16 also has an I2C bus which is a 2-wire
serial bus for communicating with some more low-cost and low pin count devices
that don't require fast data transfers.

### Internal I2C Devices
Device 42h: [X16 System Management Controller](#x16-system-management-controller)  
Device 6Fh: [MCP7940N Real-Time Clock](#mcp7940n-real-time-clock)  

## X16 I2C Bus Access

Despite having only one clock and one data line, the bus is capable of holding
many devices. Each device has a unique device address which the host has to
address them before reading/writing a data. When other devices detect that the
address isn't theirs, they will just ignore the whole data after until a stop
bit is sent or the clock line goes inactive. This allows the host to be able
to talk to only one device at a time.

The host always drive the clock line (SCL), but it's possible that the device
will keep pulling the clock line low to signal that it's still busy. The
maximum frequency is usually 400kHz. Below timing diagram shows how to
read/write a data for this bus:
```
    Start        Device Address       R/W' Ack     Data Bytes      Ack   Stop
    <----><--------------------------><--><--><------------------><----><---->
    _____   _   _   _   _   _   _   _   _   _   _   _       _   _   _   ______
SCL      |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |/ /|_| |_| |_| |_|
    __     ___ ___ ___ ___ ___ ___ ___ ___     ___ ___/ /_ ___ ___         ___
SDA   |___|___|___|___|___|___|___|___|___|___|___|___/ /_|___|___|_______|
     START  7   6   5   4   3   2   1   0  ACK  7   6 ...   1   0  ACK  STOP
```
Data transfer starts with pulling the data line low to signal the start
condition to every devices in the bus. Then begin writing a data every
falling edge of the clock (the device will read it at the rising edge). After
each byte transferred, the device will send acknowledge bit back. Read this at
the rising edge of the clock to determine if addressed devices exist and
successfully received a byte. After all bytes are transferred, clock one more
bit and then release the clock line and data line after to signal the stop
condition. For read process (R/W' bit is 1), the roles on the data line are
reversed after the first Ack: the device puts a data and the host sends
acknowledge bit instead. Sometimes a read data is infinite in length and
requires a no acknowledge (NoAck) bit to stop the device from sending more.

## X16 System Management Controller
Device 42h is a system management controller. This device monitors power usages
and communicates with the power supply, front panel buttons and LEDs. It also
accepts I2C commands for a software control of those from the main system. The
chip used for this is an ATtiny84A microcontroller with a custom Arduino-based
firmware.

Since the microcontroller uses flash memory to store a firmware, it's possible
to program this system management controller externally. However the details
about this will not be covered in this document since it's considered outside
the X16 software development scope and the microcontroller itself is quite a
complex piece of hardware.

### Transfer Sequences
```
Write Command   Start 84h Ack <CMD> Ack <VAL> Ack Stop
Read Command    Start 84h Ack <CMD> Ack Start 85h <VAL> Ack ... NoAck Stop
```

### Commands
```
CMD     VAL     Description
01h     00h     Power Off
01h     01h     Hard Reset
02h     00h     Soft Reset
03h     00h     NMI
05h     nnh     Activity LED Brightness (0-255)
07h             Read Keybord Data
08h     nnh     Read/Write Dummy Register
18h             Read Keyboard Status
19h     nnh     Write Keybord Data
1Ah     nnh nnh Write Keybord Data
21h             Read Mouse Data
```

## X16 SMC PS/2 Interface (Keyboard/Mouse)

X16 uses PS/2 connectors for each keyboard and mouse input. It is a two-wire
serial interface similar to I2C, but the transfer protocol is incompatible,
slower and has +5V logic. The connector itself doesn't differentiate between
keyboard and mouse and in theory could be plugged to any of both. However, the
keyboard and mouse use different command sets and X16 (and PC)'s device drivers
are hard-coded to handle each one on its own labelled port.

The SMC handles this slow communication and receives any new data from both
devices to its own buffer. This allows a new PS/2 data to be read at any time.
To read this data, send an appropriate read command for each device and read
until 00h is received.

### Device Self-test (BAT)
After a power-on or a reset by the host. The device will initialize to default
settings and perform a self-test referred to as Basic Assurance Test (BAT). It
will ignore any write commands until this process is finished. After finishing,
it will either send AAh for success or FCh for error.

### Keyboard Data (Scancode) Summary
A keyboard sends a data to the host in a byte sequence called scancodes to
indicate which keys are pressed/released. The following tables describe PC AT
scancode set which is the default and most supported set among modern
keyboards:
```
nn              Normal key pressed
F0h nn          Normal key released
E0h nn          Special key pressed
E0h F0h nn      Special key released
```
Sometimes, a key pressed command can be sent repeatedly as typematic repeating
keys. Its delay and repeat interval can be set by host write commands. This is
to distinguish between automatically-generated repeating keys from holding down
a key and actual repeated key pressing.

### Normal Keyboard Scancodes (US Layout)
```
    0xh     1xh     2xh     3xh     4xh     5xh     6xh     7xh     8xh
x0h <error> ---     ---     ---     ---     ---     ---     NUM-0   ---
x1h F9      LALT    C       N       ,<      ---     ---     NUM-.   ---
x2h ---     LSHIFT  X       B       K       '"      ---     NUM-2   ---
x3h F5              D       H       I       ---     ---     NUM-5   F7
x4h F3      LCTRL   E       G       O       [{      ---     NUM-6   ALT-SYSRQ
x5h F1      Q       4$      Y       0)      =+      ---     NUM-8   ---
x6h F2      1!      3#      6^      9(      ---     BS      ESC     ---
x7h F12     ---     ---     ---     ---     ---     ---     NUMLOCK ---
x8h ---     ---     ---     ---     ---     CAPS    ---     F11     ---
x9h F10     ---     SPACE   ---     .>      RSHIFT  NUM-1   NUM-ADD ---
xAh F8      Z       V       M       /?      ENTER   ---     NUM-3   ---
xBh F6      S       F       J       L       ]}      NUM-4   NUM-SUB ---
xCh F4      A       T       U       ;:      ---     NUM-7   NUM-MUL ---
xDh TAB     W       R       7&      P       \|      ---     NUM-9   ---
xEh `~      2@      5%      8*      -_      ---     ---     SCROLL  ---
xFh ---     ---     ---     ---     ---     ---     ---     ---     ---
```

### Special Keyboard Scancodes
```
E0h 11h     RALT / ALT-GR
E0h 14h     RCTRL
E0h 1Fh     LSUPER
E0h 27h     RSUPER
E0h 2Fh     MENU
E0h 3Fh     SLEEP
E0h 37h     POWER
E0h 4Ah     NUM-DIV
E0h 5Ah     NUM-RET
E0h 5Eh     WAKE
E0h 69h     END
E0h 6Bh     LEFT
E0h 6Ch     HOME
E0h 70h     INSERT
E0h 71h     DELETE
E0h 72h     DOWN
E0h 74h     RIGHT
E0h 75h     UP
E0h 7Ah     PG-DN
E0h 7Dh     PG-UP
E0h 7Eh     CTRL+BREAK
```
For PRTSCR key, it is emulated as pressing LSHIFT+NUM-MUL with special key
byte E0h applied to all emulated keys (`E0h 12h E0h 7Ch`). This might explain
why it drops the first emulated key if SHIFT or CTRL is currently pressed.

For PAUSE key, it is emulated as a complete press of RCTRL+NUMLOCK combination
with byte E1h instead of usual E0h (`E1h 14h 77h E1h F0h 14h F0h 77h`). Doesn't
generate any scancodes when released.

The following are multimedia keys which not all keyboards have them:
```
E0h 15h     Previous Track
E0h 21h     Volume Down
E0h 23h     Mute
E0h 2Bh     Calculator
E0h 32h     Volume Up
E0h 34h     Play/Pause
E0h 3Bh     Stop
E0h 40h     My Computer
E0h 48h     E-Mail
E0h 4Dh     Next Track
E0h 50h     Media Select
```

### Mouse Modes
The PS/2 mouse has 3 different modes of operation which can be set by host
write commands. These are:
* Stream Mode (default) - The mouse sends a movement data whenever it detects a
  movement or button change if data reporting is enabled. The maximum rate it
  will do this depends on the sample rate setting.
* Remote Mode - The mouse never sends a movement data but still internally
  samples and updates movements. The host can make it send movement data by
  sending the Read Data (EBh) command.
* Wrap Mode - The mouse echoes any written commands back and does nothing,
  except ECh (Wrap Mode Disable) and FFh (Reset).

### Mouse Data
The standard PS/2 mouse (which doesn't have scroll wheels) sends the following
3-byte data:
```
Byte 0
  Bit 7     Y Overflow (0=No Overflow, 1=Overflow)
  Bit 6     X Overflow (0=No Overflow, 1=Overflow)
  Bit 5     Y Sign (0=Positive, 1=Negative)
  Bit 4     X Sign (0=Positive, 1=Negative)
  Bit 3     Not Used
  Bit 2     Middle Button (0=Released, 1=Pressed)
  Bit 1     Right Button (0=Released, 1=Pressed)
  Bit 0     Left Button (0=Released, 1=Pressed)
Byte 1      X Movement
Byte 2      Y Movement
```
X/Y's movement byte and sign bit together combines to a 9-bit two's complement
signed number. If a movement exceeds this range then its appropriate overflow
bit is set.

For a mouse with scroll wheels, it still sends the 3-byte data above to retain
compatibility with existing drivers. In order to read a scroll wheel data, an
extra command sequence needs to be performed to put the mouse in a new mode
where an extra byte is also sent in addition to the standard 3-byte data:
```
Byte 3      Scrolling wheel movement change (-8..7)
            (upper 4 bits are sign extensions)

Commands:
  Set sample rate to 200
  Set sample rate to 100
  Set sample rate to 80
  Send Read ID command (F2h), the mouse should response with 03h instead of 00h
```
or
```
Byte 3
  Bit 7-6   Not Used
  Bit 5     5th Button (0=Released, 1=Pressed)
  Bit 4     4th Button (0=Released, 1=Pressed)
  Bit 3-0   Scrolling wheel movement change (-8..7)

Commands:
  Set sample rate to 200
  Set sample rate to 200
  Set sample rate to 80
  Send Read ID command (F2h), the mouse should response with 04h instead of 00h
```
There's also a two-axis scroll wheel mouse that uses the above format. For
this, vertical scrolls are reported as +/- 1 changes and horizontal scrolls are
reported as +/- 2 changes.

### Host Write Commands
Most commands here will make the device send FAh back for a successful
acknowledgement or FEh (resend) if an invalid command or argument is received
or FCh if an error occurred, unless noted otherwise. For mouse, movement
counters will also be reset. All Not Used bits should always be 0.

Keyboard
```
FFh         Reset - Keyboard will reset itself and redo the self-test
FEh         Resend - Keyboard will resend the last data that's not this command
FDh nn ..*  Set Key Type Make
FCh nn ..*  Set Key Type Make/Break
FBh nn ..*  Set Key Type Make/Typematic
              These 3 commands are multi-byte. nn indicates each set 3 scancode
              to set mode flags to. The keyboard will generate FAh for each
              scancode received and will not scan any keys during this process.
              This command is terminated by sending an invalid scancode
FAh*        Set All Keys Make/Break/Typematic
F9h*        Set All Keys Make
F8h*        Set All Keys Make/Break
F7h*        Set All Keys Make/Typematic
F6h         Set Default - Revert to the default settings on power-on/reset
              Default settings are:
              Scancode set 2, All Keys Make/Break/Typematic,
              Typematic Rate 10.9 key/s, Typematic Delay 500ms
F5h         Disable - Keyboard stops scanning and loads default settings
F4h         Enable - Keyboard starts scanning again
F3h nn      Set Typematic Rate/Delay
              Bit 7     Not Used
              Bit 6-5   Delay; (n+1)*250 ms
              Bit 4-0   Rate; 30/2^(n/8) keys/s
F2h         Read ID - Keyboard responds with a two-byte ID
F0h nn      Set/Read scancode set
              0    = Read (will respond with FAh then the current set)
              1..3 = Set scancode set 1-3
EEh         Echo - Keyboard responds EEh back
EDh nn      Set/Reset Indicators
              Bit 7-3   Not Used
              Bit 2     Caps Lock LED (0=Off, 1=On)
              Bit 1     Num Lock LED (0=Off, 1=On)
              Bit 0     Scroll Lock LED (0=Off, 1=On)
```
<small>* Only has an effect when the keyboard is using scancode set 3</small>

Mouse
```
FFh         Reset - Mouse will reset itself and redo the self-test
FEh         Resend - Mouse will resend the last data that's not this command
F6h         Set Default - Revert to the default settings on power-on/reset
              Default settings are:
              Sample Rate 100Hz, Resolution 4 dot/mm, 1:1 Scaling,
              Stream Mode, Data Reporting Disabled
F5h         Disable Data Reporting
F4h         Enable Data Reporting
              These 2 commands only has an effect in Stream mode but can be set
              in any mode.
F3h nn      Set Sample Rate; n=10,20,40,60,80,100,200 Hz
F2h         Read ID - Mouse responds with FAh then a one-byte ID
F0h         Set Remote Mode
EEh         Set Wrap Mode
ECh         Reset Wrap Mode
EBh         Read Data - Mouse responds with FAh then send movement data
EAh         Set Stream Mode
E9h         Status Request - Mouse responds with following 4-byte data:
              Byte 0    FAh (acknowledgement)
              Byte 1
                Bit 7   Not Used
                Bit 6   Mode (0=Stream, 1=Remote)
                Bit 5   Data Reporting (0=Disabled, 1=Enabled)
                Bit 4   Scaling (0=1:1, 1=2:1)
                Bit 3   Not Used
                Bit 2   Left Button (0=Released, 1=Pressed)
                Bit 1   Middle Button (0=Released, 1=Pressed)
                Bit 0   Right Button (0=Released, 1=Pressed)
              Byte 2    Resolution
              Byte 3    Sample Rate
E8h nn      Set Resolution (0=1, 1=2, 2=4, 3=8 dot/mm)
E7h         Set 2:1 Scaling
E6h         Set 1:1 Scaling
```


### PS/2 Internals

<small>This sub-section onwards is no longer accurate nor relevant for software
programming but is kept as an artifact of 3rd and older prototype boards having
to directly interface PS/2 through VIA pins.</small>

For this interface, the clock signal is always driven by a device. Since the
clock line from both ports are connected to regular I/O ports of the VIA, there
is no way to interrupt the CPU to read an incoming serial data from devices.
However, the protocol itself allows the host to pull the clock line low to
signal devices that the host is busy. This will stop any active transfers from
them, inhibit them to not send any data and wait until the clock line is
released. So, a typical keyboard/mouse reading routine in X16 usually consists
of releasing a clock line (by setting PA1/PB1 direction to read), reading all
transferred data and then pulling a clock line low again after finishing to
prevent any lost scan codes when the system is not reading it.

### PS/2 Bus Access (Read)
```
     Start            Data Byte           Parity Stop
     <----><------------------------------><--><----->
     ___   _   _   _   _   _   _   _   _   _   _   ___
CLK     |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| 
     __     ___ ___ ___ ___ ___ ___ ___ ___ ___ ______
DATA   |___|___|___|___|___|___|___|___|___|___|
      START  0   1   2   3   4   5   6   7  ODD STOP
```
After all lines are released (make sure to release the data line first or both
at the same time to avoid accidentally signalling write mode), wait a bit until
the device start pulling the clock line low, then begin reading the data every
falling edge of the clock until stop bit is read. Repeat the reading process
again for next bytes. If the device never pulls the clock line low from having
no more data to send, simply time out the wait loop and pull the clock line low
to end the process.

### PS/2 Bus Access (Write)
```
      Start            Data Byte         Parity Stop Ack
     <------><------------------------------><-->--<------>
     _     _   _   _   _   _   _   _   _   _   _   _   ____
CLK   |___| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_|
     ____     ___ ___ ___ ___ ___ ___ ___ ___ ___ _     ___
DATA     |___|___|___|___|___|___|___|___|___|___| |___|
        START  0   1   2   3   4   5   6   7  ODD S ACK
```
To write to the device, pull the clock line low to stop it from sending a data,
then send the start bit during this state to indicate write mode. Release the
clock line without changing the data line and wait a bit until the device start
pulling the clock line low and read this start bit. Then begin writing a data
every falling edge of the clock (the device will read it at the rising edge).
After the stop bit is written, release the data line for the device to send
acknowledge signal then read this at the falling edge of the clock. After this,
the device will usually send back a response data for the host to read.

### Parity Bit
The PS/2 protocol contains a simple error checking in a form of parity bit. The
number of logic 1s in the data bit and parity bit must always added up to an
odd number. The parity bit can simply calculated by XOR-ing every data bits
then invert the result: `P = NOT(D.Bit(0) XOR D.Bit(1) XOR ... XOR D.Bit(7))`



## MCP7940N Real-Time Clock
Device 6Fh is a real-time clock chip that keeps the system time running across
power cycles and provides 64 bytes of battery-backed SRAM (which is called RTC
NVRAM in earlier sections) for any data storage.

### Transfer Sequences
```
Write           Start DEh Ack <ADDR> Ack <DATA> Ack ... <DATA> Ack Stop
Address Read    Start DFh Ack <ADDR> NoAck Stop
Read            Start DEh Ack <ADDR> Ack
                Start DFh Ack <DATA> Ack ... <DATA> NoAck Stop
```
Writing or reading a byte to this chip will automatically increment the address
set by last Write/Read commands. You can read the current address by issuing
Address Read command, which the chip will send it back in ADDR field.

Random reading requires an address to be set first with I2C write and then send
a start bit again without stopping the current sequence. This will signal the
chip to stop accepting data bits and prepare for data read process instead.
Then, send I2C read and start reading data bytes. Once finish, send NoAck
instead of Ack bit to end the transfer.

### Multi-function Pin
> Is this pin actually connected to anywhere in X16? The current hardware seems
> to not doing so. Not going to document this here until it's actually used...

### Power-down and Power-up Timestamps
This real-time clock chip also has a feature where it can detect when the
primary power going to it has went down or went back up again. And store
timestamps when each of those happened. This is useful for the system to check
when an unexpected power-off has occurred and/or how long it's been turned off.

### Memory Map
```
Offset      Content
00h-1Fh     Configuration Registers
20h-5Fh     64-byte Battery-Backed SRAM (NVRAM)
60h-FFh     Not Used (the device will not generate ACK)
```
All Not Used bits in the registers are read as zero. Registers 09h, 10h and 17h
are reserved and should not be used.

### 00h - RTCSEC - Timekeeping Seconds (R/W)
```
Bit
7       Start Oscillator (0=Disabled, 1=Enabled)
6-4     BCD Tens Digit Seconds (0-5)
3-0     BCD Ones Digit Seconds (0-9)
```

### 01h - RTCMIN - Timekeeping Minutes (R/W)
```
Bit
7       Not Used
6-4     BCD Tens Digit Minutes (0-5)
3-0     BCD Ones Digit Minutes (0-9)
```

### 02h - RTCHOUR - Timekeeping Hours (R/W)
```
Bit
7       Not Used
6       Hour Format (0=24-hour, 1=12-hour)
5       AM/PM (0=AM, 1=PM) (12-hour only)
5-4     BCD Tens Digit Hours (0-2)
3-0     BCD Ones Digit Hours (0-9)
```
For 12-hour clock, BCD Ten Hours value only goes up to 1. Which means bit 5 is
never used and repurposed to store AM/PM flag.

### 03h - RTCWKDAY - Timekeeping Weekday (R/W)
```
Bit
7-6     Not Used
5       Oscillator Status (0=Disabled/Stopped, 1=Enabled/Running) (Read-only)
4       Power Failure Status (1=Power lost)
3       Battery Backup Enable (0=Disabled, 1=Enabled)
2-0     Day of Week (1-7)
```
Power Failure Status indicates that the primary power to this chip had been
lost and a power-down timestamp has been loaded (see registers 18h-1Bh).
Writing to this register will reset this bit and the entire power-down
timestamp registers. Allowing any new power-down events to be recorded again
(any newer power-down events will not overwrite the old timestamp).

Day of Week value meanings are user-defined. For X16 System, a value of 1
means Sunday (?)

### 04h - RTCDATE - Timekeeping Date (R/W)
```
Bit
7-6     Not Used
5-4     BCD Tens Digit Date (0-3)
3-0     BCD Ones Digit Date (0-9)
```

### 05h - RTCMTH - Timekeeping Month (R/W)
```
Bit
7-6     Not Used
5       Leap Year (1=Leap Year) (Read-only)
4       BCD Tens Digit Month (0-1)
3-0     BCD Ones Digit Month (0-9)
```

### 06h - RTCYEAR - Timekeeping Year (R/W)
```
Bit
7-4     BCD Tens Digit Year (0-9)
3-0     BCD Ones Digit Year (0-9)
```
The RTC chip can only stores two digits of years and treats year xx00 as not
being a leap year per Gregorian calendar rules. This gives a correct date
keeping up to year 2399, assuming the chip still survives. Of course.

### 07h - CONTROL - Control (R/W)
```
Bit
7       General Purpose Output (0=Low, 1=High)
6       Square Wave Output (0=Disable, 1=Enable)
5       Alarm 1 Enable (0=Disable, 1=Enable)
4       Alarm 0 Enable (0=Disable, 1=Enable)
3       External Oscillator Input (0=Disable, 1=Enable)
2       Coarse Trim Mode (0=Disable, 1=Enable)
1-0     Square Wave Output Frequency
          If Coarse Trim is disabled:
            0 = 1 Hz (trimmed)
            1 = 4096 Hz (trimmed)
            2 = 8192 Hz (trimmed)
            3 = 32768 Hz (not trimmed)
          Else: 64 Hz (trimmed)
```

### 08h - OSCTRIM - Oscillator Digital Trim (R/W)
```
Bit
7       Trim Sign (1=Subtract->Faster, 0=Add->Slower)
6-0     Trim Value (0=Disable Trimming)
```
The values can be treated as a sign-magnitude number n which will add/subtract
2n cycles every minute normally or at 128Hz when Coarse Trim is enabled.

### 0Ah - ALM0SEC - Alarm 0 Seconds (R/W)
### 11h - ALM1SEC - Alarm 1 Seconds (R/W)
```
Bit
7       Not Used
6-4     BCD Tens Digit Seconds (0-5)
3-0     BCD Ones Digit Seconds (0-9)
```

### 0Bh - ALM0MIN - Alarm 0 Minutes (R/W)
### 12h - ALM1MIN - Alarm 1 Minutes (R/W)
```
Bit
7       Not Used
6-4     BCD Tens Digit Minutes (0-5)
3-0     BCD Ones Digit Minutes (0-9)
```

### 0Ch - ALM0HOUR - Alarm 0 Hours (R/W)
### 13h - ALM1HOUR - Alarm 1 Hours (R/W)
```
Bit
7       Not Used
6       Hour Format (0=24-hour, 1=12-hour)
5       AM/PM (0=AM, 1=PM) (12-hour only)
5-4     BCD Tens Digit Hours (0-2)
3-0     BCD Ones Digit Hours (0-9)
```

### 0Dh - ALM0WKDAY - Alarm 0 Weekday / Mask (R/W)
### 14h - ALM1WKDAY - Alarm 1 Weekday / Mask (R/W)
```
Bit
7       Alarm Interrupt Output Polarity (0=Low, 1=High)
6-4     Alarm Mask
          0 = Seconds match
          1 = Minutes match
          2 = Hours match (chip automatically does 12/24-hour conversion)
          3 = Day of Week match
          4 = Date match
          5-6 = Reserved
          7 = Seconds, Minutes, Hour, Day of Week, Date and Month match
3       Alarm Interrupt Flag (0=None, 1=Interrupt Request)
2-0     Day of Week (1-7)
```
Writing to this register will reset Alarm Interrupt Flag bit. Alarm Interrupt
Output Polarity bit is shared and writable in Alarm 0 counterpart only.

### 0Eh - ALM0DATE - Alarm 0 Date (R/W)
### 15h - ALM1DATE - Alarm 1 Date (R/W)
```
Bit
7-6     Not Used
5-4     BCD Tens Digit Date (0-3)
3-0     BCD Ones Digit Date (0-9)
```

### 0Fh - ALM0MTH - Alarm 0 Month (R/W)
### 16h - ALM1MTH - Alarm 1 Month (R/W)
```
Bit
7-5     Not Used
4       BCD Tens Digit Month (0-1)
3-0     BCD Ones Digit Month (0-9)
```

### 18h - PWRDNMIN - Power Down Minutes (R/W)
### 1Ch - PWRUPMIN - Power Up Minutes (R/W)
```
Bit
7       Not Used
6-4     BCD Tens Digit Minutes (0-5)
3-0     BCD Ones Digit Minutes (0-9)
```

### 19h - PWRDNHOUR - Power Down Hours (R/W)
### 1Dh - PWRUPHOUR - Power Up Hours (R/W)
```
Bit
7       Not Used
6       Hour Format (0=24-hour, 1=12-hour)
5       AM/PM (0=AM, 1=PM) (12-hour only)
5-4     BCD Tens Digit Hours (0-2)
3-0     BCD Ones Digit Hours (0-9)
```

### 1Ah - PWRDNDATE - Power Down Date (R/W)
### 1Eh - PWRUPDATE - Power Up Date (R/W)
```
Bit
7-6     Not Used
5-4     BCD Tens Digit Date (0-3)
3-0     BCD Ones Digit Date (0-9)
```

### 1Bh - PWRDNMTH - Power Down Month / Weekday (R/W)
### 1Fh - PWRUPMTH - Power Up Month / Weekday (R/W)
```
Bit
7-5     Day of Week (1-7)
4       BCD Tens Digit Month (0-1)
3-0     BCD Ones Digit Month (0-9)
```


# X16 Timings

## X16 Timing Oscillators

### System Timings
```
System Oscillator       8.000000MHz
System Clock            8.000000MHz (8MHz/1)
CPU Clock               8.000000MHz (8MHz/1)
RTC Crystal             32.76800kHz
```

### VERA Timings
```
VERA Oscillator         25.00000MHz
480p Dot Clock          25.00000MHz (25MHz/1)
240p/480i Dot Clock     12.50000MHz (25MHz/2)
L/C Color Clock         3.579545MHz (25MHz*150137/2^20)
480p Line Rate          31.25000kHz (25MHz/800)
240p/480i Line Rate     15.74307kHz (25MHz/(794*2))
480p Frame Rate         59.523810Hz (25MHz/(525*800))
480i Frame Rate         29.986805Hz (25MHz/(525*794*2))
240p Frame Rate         59.859593Hz (25MHz/(263*794*2))
PSG+FIFO Sample Rate    48.82813kHz (25MHz/512)
SPI Fast Clock          12.50000MHz (25MHz/2)
SPI Slow Clock          390.6250kHz (25MHz/64)
```

### YM2151 Timings
```
YM2151 Oscillator       3.579545MHz
YM2151 Sample Rate      55.93039kHz (3.58MHz/64)
```
NOTE: Although it's exactly NTSC color clock, it's actually never used by VERA
to generate NTSC video signals. VERA internally has a counter for this.

## X16 Video Timings

### Horizontal Timings
```
Progressive Scanline Length     800 dot cycles = 256.00 CPU cycles
Interlaced Scanline Length      794 dot cycles = 508.16 CPU cycles
```

### Detailed Timings
(H=Horizontal, V=Vertical, F=Field)

Progressive Output
```
H=0        V=0          VERA starts at this time after /RES
H=0        V=0          End of VBlank
H=0        V=480        Begin of VBlank, set VBlank flag and collision latch
           V=524        Last line, begin of rendering
H=0        V=IRQLINE    Generate line IRQ
H=0..639   V=0..479     Draw picture
H=799                   Last dot in the line
```
Interlaced Output
```
H=0        V=0      F=0 VERA starts at this time after /RES
H=0        V=0          End of VBlank, toggle field
H=0        V=240        Begin of VBlank, set VBlank flag and collision latch
           V=262    F=1 Last line, begin of rendering (Odd Frames)
           V=263    F=0 Last line, begin of rendering (Even Frames)
H=135      V=IRQLINE/2  Generate line IRQ
H=135..774 V=0..239     Draw picture
H=793                   Last dot in the line
```


# X16 Pinouts

### External Connectors
[X16 Power Supply](#x16-power-supply)  
[X16 PS/2 Connector Pinouts](#x16-ps2-connector-pinouts)  
[X16 Serial Connector Pinouts](#x16-serial-connector-pinouts)  
[X16 Joypad Connector Pinouts](#x16-joypad-connector-pinouts)  
[X16 Audio/Video Connector Pinouts](#x16-audiovideo-connector-pinouts)  
[X16 Memory Card Pinouts](#x16-memory-card-pinouts) 
[X16 Expansion Port Pinouts](#x16-expansion-port-pinouts)  

### Internal Connectors
[X16 Pinouts VERA Module](#x16-pinouts-vera-module)  

### Chips
[X16 Pinouts SMC Chip](#x16-pinouts-smc-chip)  
[X16 Pinouts VERA Chips](#x16-pinouts-vera-chips)  
[X16 Pinouts 65C02 CPU](#x16-pinouts-65c02-cpu)  
[X16 Pinouts VIA Chip](#x16-pinouts-via-chip)  
[X16 Pinouts YM2151 Chip](#x16-pinouts-ym2151-chip)  

## X16 Power Supply

### X16p: ATX (20-pin socket)
```
         _____
  +3.3V |1  13| +3.3V
  +3.3V |2  14| -12V
    GND |3  15| GND
    +5V |4  16| /PWR_ON
    GND |5  17||GND
    +5V |6  18||GND
    GND |7  19| GND
 PWR_OK |8  20| NC
 +5V_SB |9  21| +5V
   +12V |10 22| +5V
        '-----'
```

## X16 PS/2 Connector Pinouts
```
    Keyboard Port   Mouse Port
1   Keyboard Data   Mouse Data              _ _
2   Not Connected   Not Connected         .' - '.
3   Ground          Ground           NC  / 6 . 5 \  CLK
4   VCC +5V         VCC +5V         VCC | 4  '  3 | GND
5   Keyboard Clock  Mouse Clock      NC  \  2 1  /  DAT
6   Not Connected   Not Connected         '.___.'
```

## X16 Serial Connector Pinouts
```
1   Service Request                         _ _
2   Ground                                .' - '.
3   Attention                      DATA  / 5   1 \  SRQ
4   Clock                               |    6    | RESET
5   Data                            CLK  \ 4   2 /  GND
6   Reset                                 '._3_.'   ATN
```

## X16 Joypad Connector Pinouts
```
    Port 1          Port 2           ______________________________
1   VCC +5V         VCC +5V         |  1   2   3   4  |  5   6   7 \
2   JOY-1/3 Clock   JOY-2/4 Clock   | VCC CK1 STB IN1 | IN3 IO6 GND | 1
3   JOY Strobe      JOY Strobe      |_________________|____________/
4   JOY-1 Data      JOY-2 Data       ______________________________
5   JOY-3 Data      JOY-4 Data      |  1   2   3   4  |  5   6   7 \
6   I/O bit 6 (NC)  I/O bit 7 (NC)  | VCC CK2 STB IN2 | IN4 IO7 GND | 2
7   Ground          Ground          |_________________|____________/
```
NOTE: In Developer Board (and probably older prototype boards), IN3 and IN4 are
not connected to the connector port but are available in separate pin headers.

## X16 Audio/Video Connector Pinouts

### RGB Out (VGA Connector)
```
1   Red     6   R Rtn.  11  ID0/RES      ______________________
2   Green   7   G Rtn.  12  ID1/SDA     /  5   4   3   2   1   \
3   Blue    8   B Rtn.  13  HSync       |    10  9   8   7   6 |
4   ID2/RES 9   Key/+5V 14  VSync        | 15  14  13  12  11 |
5   Ground  10  Ground  15  ID3/SCL       --------------------
```
NOTE: In display modes with a composite sync, the sync signal is only output in
pin 13; pin 14 will always output ground.

### Composite Out (Yellow RCA Connector)
```
Tip     Video            .--.
Ring    Ground          | ()-|--COMP
                        '.__.'--GND
```

### Luma/Chroma Out (S-Video Connector)
```
                            _ _
1   Ground                .' - '.
2   Ground            C  / 4   3 \  Y
3   Luminance       GND | 2     1 | GND
4   Chrominance          \  [_]  /
                          '.___.'
```

### Audio Out (3.5mm Phone Connector)
```
Tip     Audio Left       ___ ___ _____.-----------.
Ring    Audio Right     (___|___|_____|           |
Sleeve  Ground            L   R   GND '-----------'
```

## X16 Memory Card Pinouts
```
    SPI Mode    Native Mode                        ________________
                1-bit Bus   4-bit Bus             / _ _,-,-._ _ _ _|
1   /CS         CD          DAT3                 /_|1|2|3|4|5|6|7|8|
2   DI          CMD         CMD                 ||9|-'-'-'-'-'-'- -|  WP Tab
3   GND         GND         GND                 |'-'              || <-Unlock
4   VDD         VDD         VDD                  ]                |  <-Lock
5   CLK         CLK         CLK                 |                  |
6   GND         GND         GND                 |                  |
7   DO          DAT0        DAT0                |                  |
8   /IRQ (SDIO) /IRQ (SDIO) DAT1 /IRQ (SDIO)    |                  |
9   NC          NC          DAT2                |                  |
CD  Card detect (slot only)                     |                  |
WP  Write protect (slot only)                   '------------------'
```

## X16 Expansion Port Pinouts
X16p has 4 identical expansion ports located at where ATX expansion slots would
be. Physically, they are 60-pin PCB edge connectors with a 2.54mm pitch.
The following pinouts are viewed from the component side.

### X16p "Developer Board" Expansion Port Pinouts
```
      ^^^ To I/O side ^^^
             -------
    -12V -- |1    31| -- +12V
     GND -- |2    32| -- +5V
 AUDIO_L <- |3    33| -- GND
 AUDIO_R <- |4    34| <- ROMB7
    /IO3 -> |5    35| <- ROMB0
    /IO4 -> |6    36| <- ROMB1
    /IO7 -> |7    37| <- ROMB6
    /IO5 -> |8    38| <- ROMB2
    /IO6 -> |9    39| <- ROMB5
    /RES -> |10   40| <- ROMB3
     RDY <> |11   41| <- ROMB4
    /IRQ <- |12   42| <- PHI2
      BE <- |13   43| <> R/W
    /NMI <- |14   44| <- /ML
    SYNC -> |15   45| <> D0
      A0 <> |16   46| <> D1
      A1 <> |17   47| <> D2
      A2 <> |18   48| <> D3
      A3 <> |19   49| <> D4
      A4 <> |20   50| <> D5
      A5 <> |21   51| <> D6
      A6 <> |22   52| <> D7
      A7 <> |23   53| <> A15
      A8 <> |24   54| <> A14
      A9 <> |25   55| <> A13
     A10 <> |26   56| <> A12
     A11 <> |27   57| <> SDA
     GND -- |28   58| <> SCL
     +5V -- |29   59| -- GND
    +12V -- |30   60| -- -12V
             -------
```

### X16p "Prototype #3" Expansion Port Pinouts
```
      ^^^ To I/O side ^^^
             -------
    -12V -- |1    31| -- +12V
     GND -- |2    32| -- +5V
   +3.3V -- |3    33| -- GND
     GND -- |4    34| <- /IO4
 AUDIO_L <- |5    35| <- /IO5
     GND -- |6    36| <- /IO6
 AUDIO_R <- |7    37| <- /IO7
     GND -- |8    38| <- /IO8
     /VP -> |9    39| <- /RES
     RDY <> |10   40| -- GND
    /IRQ <- |11   41| <- PHI2
      BE <- |12   42| <- /ML
    /NMI <- |13   43| -- GND
    SYNC -> |14   44| <> R/W
     GND -- |15   45| <> D0
      A0 <> |16   46| <> D1
      A1 <> |17   47| <> D2
      A2 <> |18   48| <> D3
      A3 <> |19   49| <> D4
      A4 <> |20   50| <> D5
      A5 <> |21   51| <> D6
      A6 <> |22   52| <> D7
      A7 <> |23   53| <> A15
      A8 <> |24   54| <> A14
      A9 <> |25   55| <> A13
     A10 <> |26   56| <> A12
     A11 <> |27   57| -- GND
     GND -- |28   58| -- +3.3V
     +5V -- |29   59| -- GND
    +12V -- |30   60| -- -12V
             -------
```

## X16 Pinouts VERA Module
Viewed from component side, the connector is a 2x12 pin header with a 2.54mm
pitch.
```
             -------
     VCC -- |1     2| -- GND
      D7 <> |3     4| <> D6
      D5 <> |5     6| <> D4
      D3 <> |7     8| <> D2
      D1 <> |9    10| <> D0
     /CS -> |11   12| <- /RES
     /WR -> |13   14| -> /IRQ
      A4 -> |15   16| <- /RD
      A2 -> |17   18| <- A3
      A0 -> |19   20| <- A1
     GND -- |21   22| -- GND
 AUDIO_L <- |23   24| -> AUDIO_R
             -------
```

## X16 Pinouts SMC Chip
Developer Board
```
              .---_---.
      I2C_SDA |1    20| /RES
         /IRQ |2  T 19| /NMI
      I2C_SCL |3  I 18| KB_CLK
       KB_DAT |4  N 17| PWR_OK
          VCC |5  Y 16| AGND
          GND |6  8 15| AVCC
    RESET_BTN |7  6 14| PWR_BTN
    MOUSE_DAT |8  1 13| /PWR_ON
    MOUSE_CLK |9    12| HDD_LED
   /SMC_RESET |10   11| NMI_BTN
              '-------'
```
Prototype #3
```
              .---_---.
      I2C_SDA |1    20| /RES
      HDD_LED |2  T 19| /NMI
      I2C_SCL |3  I 18| RESET_BTN
   KB_DAT (?) |4  N 17| NMI_BTN
          VCC |5  Y 16| AGND
          GND |6  8 15| AVCC
   KB_CLK (?) |7  6 14| PWR_BTN
MOUSE_DAT (?) |8  1 13| /PWR_ON
MOUSE_CLK (?) |9    12| PWR_OK
   /SMC_RESET |10   11| (?)
              '-------'
```

## X16 Pinouts VERA Chips

### Module (rev4)
```
Board:      COMMANDER X16p VERA module rev4 by Frank van den Hoef (c) 2020
U1  48-pin  ICE40UP5K-SG48ITR50         ; VERA FPGA
U2  14-pin  74AHC00PW                   ; Quad NAND gate (for U4 enable pins)
U3  24-pin  SN74CBTD3861PWR             ; Address bus switch + level shifter
U4  14-pin  74CBTLV3126PW,118           ; Memory card buffer
U5  24-pin  74LVC4245APW                ; Data bus transceiver + level shifter
U6  16-pin  WM8524CGEDT                 ; Audio dual 24-bit D/A 
U7  8-pin   W25Q16JVSNIQ                ; FPGA 2Mx8 config flash
U9  5-pin   AP3417CKTR-G1               ; 1.2V switching regulator
U10 5-pin   MIC5504-3.3YM5              ; 3.3V linear regulator
U11 8-pin   THS7314D                    ; SDTV video amplifier
X1  4-pin   SG5032CAN_25.000000M-TJGA3  ; Oscillator 25.0MHz
JP1 2-pin   Configuration flash enable jumper
J1  24-pin  Module connector
J2  8-pin   Programmer connector
J3  11-pin  Memory card slot
J4  2-pin   RCA composite video connector
J5  15-pin  DE-15 female VGA connector
J9  4-pin   S-Video connector
```

### VERA FPGA (rev4 module)
```
1   VCCIO (+3.3V)   13  VGA_R3 COMP_L5  25  D2              37  A2
2   VGA_B3 COMP_C3  14  SPI_SO          26  D1              38  AUDIO_BCK
3   VGA_G0 COMP_C4  15  SPI_SCK         27  D0              39  A1
4   VGA_G1 COMP_C5  16  SPI_SS          28  /CS             40  A0
5   VCC (+1.2V)     17  SPI_SI          29  VCCPLL (+1.2V)  41  A3 
6   VGA_G2 COMP_L0  18  D7              30  VCC (+1.2V)     42  AUDIO_DATA
7   CDONE           19  D6              31  /WR             43  AUDIO_LRCK
8   /CRESET         20  D5              32  /IRQ            44  VGA_HSYNC
9   VGA_G3 COMP_L1  21  D4              33  VCCIO (+3.3V)   45  VGA_VSYNC
10  VGA_R0 COMP_L2  22  VCCIO (+3.3V)   34  A4              46  VGA_B0 COMP_L0
11  VGA_R1 COMP_L3  23  D3              35  SYSCLK          47  VGA_B1 COMP_L1
12  VGA_R2 COMP_L4  24  VPP_2V5 (+3.3V) 36  /RD             48  VGA_B2 COMP_L2
EP  GND
```

## X16 Pinouts 65C02 CPU

```
            .---_---.
        /VP |1    40| /RES
        RDY |2    39| PHI2O
      PHI1O |3    38| /SO
       /IRQ |4    37| PHI2
        /ML |5    36| BE
       /NMI |6    35| NC
       SYNC |7    34| R/W
        VCC |8    33| D0
         A0 |9    32| D1
         A1 |10   31| D2
         A2 |11   30| D3
         A3 |12   29| D4
         A4 |13   28| D5
         A5 |14   27| D6
         A6 |15   26| D7
         A7 |16   25| A15
         A8 |17   24| A14
         A9 |18   23| A13
        A10 |19   22| A12
        A11 |20   21| GND
            '-------'
```

## X16 Pinouts VIA Chip

```
                .---_---.
            GND |1    40| CA1
  (I2C_SDA) PA0 |2    39| CA2
  (I2C_SCL) PA1 |3    38| RS0
  (JOY_STB) PA2 |4    37| RS1
  (JOY_CLK) PA3 |5    36| RS2
  (JOY_IN4) PA4 |6    35| RS3
  (JOY_IN3) PA5 |7    34| /RES
  (JOY_IN2) PA6 |8    33| D0
  (JOY_IN1) PA7 |9    32| D1
            PB0 |10   31| D2
            PB1 |11   30| D3
            PB2 |12   29| D4
  (SER_ATN) PB3 |13   28| D5
 (SER_CLKO) PB4 |14   27| D6
 (SER_DATO) PB5 |15   26| D7
 (SER_CLKI) PB6 |16   25| PHI2
 (SER_DATI) PB7 |17   24| CS1
  (SER_SRQ) CB1 |18   23| /CS2
            CB2 |19   22| R/W
            VCC |20   21| /IRQ
                '-------'
```

## X16 Pinouts YM2151 Chip

```
            .---_---.
        GND |1    24| PHIM
       /IRQ |2    23| PHI1
        /IC |3    22| VCC
         A0 |4    21| SO
        /WR |5    20| SH1
        /RD |6    19| SH2
        /CS |7    18| D7
        CT1 |8    17| D6
        CT2 |9    16| D5
         D0 |10   15| D4
        GND |11   14| D3
         D1 |12   13| D2
            '-------'
```


# X16 Hardware History

(under construction)


# VIA Versatile Interface Adapter

The following addresses are X16 I/O address, which the lowest 4 bits are mapped
directly to RSx inputs.

[VIA Peripheral Data Ports](#via-peripheral-data-ports)  
[VIA Data Transfer Controls](#via-data-transfer-controls)  
[VIA Timer 1](#via-timer-1)  
[VIA Timer 2](#via-timer-2)  
[VIA Shift Register](#via-shift-register)  
[VIA Interrupts](#via-interrupts)  

## VIA Peripheral Data Ports

### 9F00h - PRB - Port B Input/Output (R/W)
### 9F01h - PRA - Port A Input/Output (R/W)
### 9F0Fh - PRA2 - Port A Input/Output Without Handshaking (R/W)
Write to port output or read from port input. A bit value of 0 means
physical logic 0 input/output and a bit value of 1 means physical logic 1
input/output. This register is internally separated to one for input (IRx) and
another for output (ORx). The corresponding behavior between this register and
physical pin output for each bit n is as described below:
```
Data Dir.   Latching    Write Behavior              Read Behavior              
+------------------------------------------------------------------------------
DDRx        Disabled    Only output register is     Pxn pin's level is read to
bit n = 0               set. Pxn pin remain Hi-Z    bit n
(Input)     -------------------------------------------------------------------
            Enabled     Only output register is     Input register bit n which
                        set. Pxn pin remain Hi-Z    is latched at last Cx1
                                                    transition is read
+------------------------------------------------------------------------------
DDRx        Disabled    Pxn pin's output level is   Pxn pin's level is read to
bit n = 1               set to bit n's value        bit n
(Output)    -------------------------------------------------------------------
            Enabled     Pxn pin's output level is   Input register bit n which
                        set to bit n's value        is latched at last Cx1
                                                    transition is read
```
Latching is controlled by ACR bit 0-1's value (for Port A and B respectively).

### 9F02h - DDRB - Port B Data Direction (R/W)
### 9F03h - DDRA - Port A Data Direction (R/W)
Set the data direction for each port. For each bit n of DDRx register: a value
of 0 (input) means Pxn pin is released to high Z state, allowing other devices
to drive it; a value of 1 (output) means Pxn pin is driven to the current
output register value of the same port and bit.

As explained in PRx registers, when these registers are written to change from
input to output, all corresponding pins will output what's in the output
register which can be changed even when the direction was set to input.

## VIA Data Transfer Controls

### 9F0Bh - ACR - Auxiliary Control Register (R/W)
```
Bit
7       T1 PB7 Output (0=Disable, 1=Enable)
6       T1 Timer Control
          0 = Run Once Every T1 Load, PB7 One Shot Output
          1 = Run Continuously, PB7 Square Wave Output
5       T2 Timer Control (0=Normal, 1=Clocked by PB6)
4-2     Shift Register Control
          0 = Shifting Disabled
          1 = Shift In At T2 Rate
          2 = Shift In At PHI2 Clock
          3 = Shift In At CB1 Input Clock
          4 = Shift Out Free-running At T2 Rate
          5 = Shift Out At T2 Rate
          6 = Shift Out At PHI2 Clock
          7 = Shift Out At CB1 Input Clock
1       Latch Port B (0=Disable, 1=Latch At CB1 Transition)
0       Latch Port A (0=Disable, 1=Latch At CA1 Transition)
```
If T1 PB7 Output is enabled, PB7 pin's output is overridden to always output
a level according to Timer 1's operation. Although DDRB bit 7 setting can
still make PB7 pin to be an input.

### 9F0Ch - PCR - Peripheral Control Register (R/W)
```
Bit
7-5     CB2 Control
          0 = Input, Generate at Falling Edge
          1 = Independent Interrupt Input, Generate at Falling Edge
          2 = Input, Generate at Rising Edge
          3 = Independent Interrupt Input, Generate at Rising Edge
          4 = Handshake Output
          5 = Pulse Output
          6 = Low Output (Always output 0)
          7 = High Output (Always output 1)
4       CB1 Interrupt Control
          0 = Generate Interrupt at Falling Edge
          1 = Generate Interrupt at Rising Edge
3-1     CA2 Control (Same as CB2)
0       CA1 Interrupt Control (Same as CB1)
```
Cx2 pin can be set to input (released) or output (driven) through this
register. Cx1 pin is always an input pin. Independent interrupt input doesn't
depend on handshake control's state and reading/writing to PRx will not clear
interrupt flag.

### Handshake Control
VIA provides a way to signal and control data transfers between the processor
and devices with handshake lines though CAx pins for port A and CBx pins for
port B. Handshake controls can be enabled or disabled by configuring related
control bits in PCR and IER.

For write handshake control, any writes to PRx will generate a "data ready"
signal on Cx2. This will notify the device to read the written data and send
"data taken" signal in return to Cx1. As shown in the below timing diagram:
```
              _   _   _   _   _   _   _   _   _   _   _   _   _   _   _
PHI2        _| |_| |_| |_| |_| / / |_| |_| |_| |_| / / |_| |_| |_| |_|
                ___                                         ___
PRx Write   ___|   |___________/ /_________________/ /_____|   |_______
            _________                    __________/ /___________
Cx2 (Hand-           |_________/ /______|                        |_____
shake Out)  _________     _____/ /_________________/ /___________     _
Cx2                  |___|                                       |___|
(Pulse Out) ___________________/ /______      _____/ /_________________
Cx1                                     |____|_____/ /_____|
            ___________________/ /______                          _____
IRQB                                    |__________/ /___________|
(IER.1/4=1)
```
For read handshake control (port A only), when a "data ready" signal from the
device is received on CA1, it will generate an interrupt if enabled. This will
interrupt the processor to read an incoming byte in PRA at any time. Any reads
from PRA will generate a "data taken" signal on CA2 to notify the device.
```
              _   _   _   _   _   _   _   _   _   _   _   _   _
PHI2        _| |_| |_| |_| / / |_| |_| |_| |_| |_| / / |_| |_|
            ____      _____/ /_____________________/ /_____
CA1             |____|_____/ /_____|                       |___
            ____                        ___________/ /_____
IRQB            |__________/ /_________|                   |___
(IER.1=1)                           ___
PRA Read    _______________/ /_____|   |___________/ /_________
            _______________/ /_________                     ___
CA2 (Hand-                             |___________/ /_____|
shake Out)  _______________/ /_________     _______/ /_________
CA2                                    |___|
(Pulse Out)
```

## VIA Timer 1

Timer 1 is a 16-bit counter which counts down at a rate of PHI2. When the
counter reaches 0, IFR bit 6 is set and generate an interrupt if it's enabled.
After this, it will either not generate any more interrupts or reload the
counter with a latched value depending on the modes described below. Timer 1
can also be configured to toggle output on PB7 pin with ACR bit 7 setting.

### 9F04h/9F05h - T1L/T1H - T1 Counter (R/W)
Reads will return the current counter value and clear IFR bit 6 if the lower 8
bits are read. Writes will set the latch (reload) value. If the upper 8 bits
are written, also reload the counter with a new value, start the counting and
clear IFR bit 6. When restarting the counter with a new reload value, it's
recommended to write to 4h first then write to 5h.

### 9F06h/9F07h - T1LL/T1LH - T1 Latch (R/W)
Reads will return the latch (reload) value but doesn't clear IFR bit 6. Writes
will set the latch value. If the upper 8 bits are written, clear IFR bit 6 only
(no counter reload like in T1H).

### Timer 1 One-shot Mode (ACR bit 6 = 0)
```
              _   _   _   _   _   _   _   _    _    _    _
PHI2        _| |_| |_| |_| |_| / / |_| |_| |__| |__| |__|
               :___:                          :
T1H Write   ___|   |___________/ /________________________
            ___________________/ /____________:
IRQB               :                          |___________
(IER.6=1)   _______:                          :___________
PB7 Out            |___________/ /____________|
(ACR.7=1)   _______:___ ___ ___   _ ___ ___ ____ ____ ____
Counter     _______|_N_|N-1|N-2/ / |_1_|_0_|FFFF|_N__|N-1_
(if T1)     _______:___ ___ ___   _ ___ ___ ____ ____ ____
Counter     _______|_N_|N-1|N-2/ / |_1_|_0_|FFFF|FFFE|FFFD
(if T2)            <-------N+1.5 cycles------>
```

### Timer 1 Free-running Mode (ACR bit 6 = 1)
```
              _   _   _   _   _   _   _   _   _   _   _   _
PHI2        _| |_| |_| |_| / / |_| |_| |_| / / |_| |_| |_|
                ___:                 :                 :
T1H Write   ___|   |_______/ /_____________/ /_____________
            _______________/ /_______:        _________:
IRQB               :                 |_____/ /         |___
(IER.6=1)   _______:                 :_____/ /_________:
PB7 Out            |_______/ /_______|                 |___
(ACR.7=1)          <--N+1.5 cycles--><--N+2.5 cycles-->
```

## VIA Timer 2

Timer 2 is also a 16-bit counter which counts down at a rate of PHI2 or PB6
input. When the counter reaches 0, IFR bit 5 is set and generate an interrupt
if it's enabled. Timer 2 is one-shot mode only and works the same as Timer 1
except the counter reloads to FFFFh instead and there's no PB7 output.

### 9F08h/9F09h - T2L/T2H - T2 Counter (R/W)
Reads will return the current counter value and clear IFR bit 5 if the lower 8
bits are read. Writes will set the latch (reload) value. If the upper 8 bits
are written, also reload the counter with a new value, start the counting and
clear IFR bit 5. When restarting the counter with a new reload value, it's
recommended to write to 8h first then write to 9h.

### Timer 2 Pulse Counting Mode (ACR bit 5 = 1)
```
                ___
T1H Write   ___|   |_________________/ /___________________
            _____________   ___   ___/ /_   ___   ___   ___
PB6 Input          :     |_|   |_|       |_|   |_|   |_|
            _________________________/ /_______:     :
IRQB               :     :     :         :     |___________
(IER.5=1)   _______:_____:_____:_____   _:_____:_____:_____
Counter     _______|__N__|_N-1_|_N-2_/ / |__1__|__0__|FFFF_
```

## VIA Shift Register

### 9F0Ah - SR  - Shift Register (R/W)
The shift register contains an 8-bit buffer which is used to perform
bidirectional serial transfers on CB2 pin with automatic clocking from either
CB1 pin input or internal counters, depending on the current ACR setting.
It also has a counter to keep track of the current shifting state and notify
when a byte is transferred. Each shift clock will shift in/out the lowest bit
of shift register's content.

CAUTION: In every modes that involve using Timer 2 as a shift clock source,
only the lower 8 bits of it are reloaded and counted.

### Shifting Disabled (ACR bit 2-4 = 0)
No shifting occurs, shift register can be read/written freely. Both CB1 and CB2
pins are not overridden and controlled by PCR or handshake control as normal.
IFR bit 2 is always cleared.

### Shift In At T2 Rate (ACR bit 2-4 = 1)
```
                     <--N+2 cycles--><--N+2 cycles--><-13N+26 cycles->
          _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _
PHI2    _| |_| |_| |_| |_| |_| / / |_| |_| |_| / / |_| |_| |_| / / |_| |_| |_|
            ___      :               :               :               :     :
SR Read ___|   |_______________/ /_____________/ /_____________/ /_____________
/Write  _____________:               :_________/ /___:               :_________
CB1 Out              |_________/ /___|               |_________/ /___|     :
(Clock) ___________________ ___/ /_________ ___/ /_________ ___/ /_________:___
CB2 In  ___________________|___/ /_________|___/ /_________|___/ /_________|___
(Data)                             0              xxx        1 ...    7    :
        _______________________/ /_____________/ /_____________/ /_________: 
IRQB                                                                       |___
(IER.2=1)
```
In this mode, the shift clock is controlled by Timer 2 counter. Each read/write
to the shift register will reset the shift counter and eight bits are shifted
in from CB2 pin from bit 0 to bit 7. At the same time, a shift clock signal is
output to CB1 pin for the device to change the data at the falling edge of it.
(the chip reads at every rising edge). After all bits are shifted, the shifting
is disabled and IFR bit 2 is set.

### Shift In At PHI2 Clock (ACR bit 2-4 = 2)
```
          _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _
PHI2    _| |_| |_| |_| |_| |_| |_| |_| |_| |_| / / |_| |_| |_| |_| |_| |_| |_|
            ___      :   :   :                                   :       :
SR Read ___|   |_______________________________/ /_____________________________
/Write  _____________:   :___:    ___     ___     ___     ___    :_____________
CB1 Out              |___|   |___|   |___|   |_/ /   |___|   |___|       :
(Clock) ______________ _______ _______ _______ / /____ _______ _______ ________
CB2 In  ______________|_______|_______|_______|/ /____|_______|_______|________
(Data)                    0       1       2    ...        6       7      :
        _________________________________________________________________: 
IRQB                                                                     |_____
(IER.2=1)
```
Same as Shift In At T2 Rate but the clock output is driven by PHI2 clock
directly at half the frequency.

### Shift In At CB1 Input Clock (ACR bit 2-4 = 3)
```
          _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _
PHI2    _| |_| |_| / / |_| |_| / / |_| / / |_| |_| / / |_| |_| / / |_| |_| |_|
        _____            ______/ /_            ____/ /___            __________
CB1 In       |_____/ /__|          |___/ /____|          |_____/ /__|  :
(Clock) _______ ___/ /____ ____/ /___ _/ /______ __/ /_____ ___/ /_____:_______
CB2 In  _______|___/ /____|____/ /___| / /______|__/ /_____|___/ /_____|_______
(Data)              0         xxx         1         xxx      2 ...  7  :
        ___________/ /_________/ /____ / /_________/ /_________/ /_____:
IRQB                                                                   |_______
(IER.2=1)
```
Same as Shift In At T2 Rate but shifting is driven by CB1 input clock and there
is no need to read/write to the shift register to start shifting.

### Shift Out Free-running At T2 Rate (ACR bit 2-4 = 4)
```
                         <----2N+4 cycles---><---14N+28 cycles-->
          _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _
PHI2    _| |_| |_| |_| |_| |_| / / |_| / / |_| |_| / / |_| / / |_| |_| / / |_|
            ___          :           :       :           :       :           :
SR Read ___|   |_______________/ /_____/ /_________/ /_____/ /_________/ /_____
/Write  _________________:           :_/ /___:           :_/ /___:           :_
CB1 Out                  |_____/ /___|       |_____/ /___|       |_____/ /___| 
(Clock) ___________________ ___/ /_____/ /_____ ___/ /_____/ /_____ ___/ /_____
CB2 Out ___________________|___/ /_____/ /_____|___/ /_____/ /_____|___/ /_____
(Data)                               0               1     ...  7        0
```
Same as Shift Out At T2 Rate but the shifting will never stop and interrupt is
never generated. Shift register's content is rotated right instead which will
put 8 bits of data out to CB2 pin repetitively. This is useful as a pulse
generator or crude PWM/PDM output when running at maximum Timer 2 speed (N=1).

### Shift Out At T2 Rate (ACR bit 2-4 = 5)
```
                         <----2N+4 cycles---><-------13N+26 cycles------>
          _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _
PHI2    _| |_| |_| |_| |_| |_| / / |_| / / |_| |_| / / |_| |_| / / |_| |_| |_|
            ___          :           :       :           :               :
SR Read ___|   |_______________/ /_____/ /_________/ /_________/ /_____________
/Write  _________________:           :_/ /___:           :_____/ /       :_____
CB1 Out                  |_____/ /___|       |_____/ /___|     / /_______|
(Clock) ___________________ ___/ /_____/ /_____ ___/ /_________/ /_____________
CB2 Out ___________________|___/ /_____/ /_____|___/ /_________/ /_____________
(Data)                               0                 1       ...   7   :
        _______________________/ /_____/ /_________/ /_________/ /_______: 
IRQB                                                                     |_____
(IER.2=1)
```
In this mode, the shift clock is controlled by Timer 2 counter. Each read/write
to the shift register will reset the shift counter and eight bits are shifted
out to CB2 pin from bit 0 to bit 7. At the same time, a shift clock signal is
output to CB1 pin for the device to read the data at the rising edge of it.
After all bits are shifted, the shifting is disabled, IFR bit 2 is set and CB2
output will remain at the last bit's level.

### Shift Out At PHI2 Clock (ACR bit 2-4 = 6)
```
          _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _
PHI2    _| |_| |_| |_| |_| |_| |_| |_| |_| |_| / / |_| |_| |_| |_| |_| |_| |_|
            ___      :   :   :                                           :
SR Read ___|   |_______________________________/ /_____________________________
/Write  _____________:   :___:    ___     ___     ___     ___     ___    :_____
CB1 Out              |___|   |___|   |___|   |_/ /   |___|   |___|   |___|
(Clock) ______________ _______ _______ _______ / /____ _______ _______ ________
CB2 Out ______________|_______|_______|_______|/ /____|_______|_______|________
(Data)                    0       1       2    ...        5       6      : 7
        _________________________________________________________________: 
IRQB                                                                     |_____
(IER.2=1)
```
Same as Shift Out At T2 Rate but the clock output is driven by PHI2 clock
directly at half the frequency.

### Shift Out At CB1 Input Clock (ACR bit 2-4 = 7)
```
          _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _   _
PHI2    _| |_| |_| |_| |_| / / |_| / / |_| / / |_| / / |_| |_| / / |_| |_| |_|
            ___        :               :                   : :
SR Read ___|   |___________/ /_____/ /_____/ /_____/ /_________/ /_____________
/Write  _____________  :         __/ /_:           / /___  : :       __________
CB1 In               |_____/ /__|      |___/ /____|      |_____/ /__|
(Clock) _______________:___/ /_____/ /_:___/ /_____/ /_____:___/ /_____________
CB2 Out _______________|___/ /_____/ /_|___/ /_____/ /_____|___/ /_____________
(Data)                          0            1     ...  6    :  7
        ___________________/ /_____/ /____ / /_____/ /_______:
IRQB                                                         |_/ /_____________
(IER.2=1)
```
Same as Shift Out At T2 Rate but shifting is driven by CB1 input clock.

## VIA Interrupts

### 9F0Dh - IFR - Interrupt Flags Register (R/W)
```
Bit
7       Interrupt Request; 1 if there's any set bits in IER AND IFR
6       Timer 1 Timeout Flag (0=None, 1=Interrupt Request)
5       Timer 2 Timeout Flag (0=None, 1=Interrupt Request)
4       CB1 Transition Flag (0=None, 1=Interrupt Request)
3       CB2 Transition Flag (0=None, 1=Interrupt Request)
2       Byte Shifted Flag (0=None, 1=Interrupt Request)
1       CA1 Transition Flag (0=None, 1=Interrupt Request)
0       CA2 Transition Flag (0=None, 1=Interrupt Request)
```
Bit 7 directly corresponds to the output of IRQB pin, which is used to quickly
check if this chip is the one generating an interrupt. It can only be cleared
when all enabled and active interrupt flags are cleared. The other flags can
only be cleared by writing a bit 1 to its corresponding bit in this register
or:
```
Timer 1 Timeout:    Read T1L or write T1H or write T1LH
Timer 2 Timeout:    Read T2L or write T2H
Cx1 Transition:     Read or write PRx
Cx2 Transition:     Read or write PRx (Dependent-only)
Byte Shifted:       Read or write SR
```

### 9F0Eh - IER - Interrupt Enable Register (R/W)
```
Bit
7       Enable/Disable Selected Bits (0=Disable, 1=Enable)
6       Timer 1 Timeout Interrupt (0=Unselect, 1=Select)
5       Timer 2 Timeout Interrupt (0=Unselect, 1=Select)
4       CB1 Transition Interrupt (0=Unselect, 1=Select)
3       CB2 Transition Interrupt (0=Unselect, 1=Select)
2       Byte Shifted Interrupt (0=Unselect, 1=Select)
1       CA1 Transition Interrupt (0=Unselect, 1=Select)
0       CA2 Transition Interrupt (0=Unselect, 1=Select)
```
Enable/Disable is only applied to selected bits of that write data. For
example, writing E0h will enable Timer 1 and 2 interrupts and leave the
rest unchanged. On read, Enable/Disable bit will always be 1.

# YM2151 FM Operator Type-M (OPM)

### Overview
[YM2151 Address Map](#ym2151-address-map)  
[YM2151 Block Diagram](#ym2151-block-diagram)  

### Functions
[YM2151 Control Registers](#ym2151-control-registers)  
[YM2151 Timers](#ym2151-timers)  
[YM2151 Channels and Slots](#ym2151-channels-and-slots)  
[YM2151 Phase Generator](#ym2151-phase-generator)  
[YM2151 ADSR Envelope](#ym2151-adsr-envelope)  
[YM2151 Low Frequency Oscillator (LFO)](#ym2151-low-frequency-oscillator-lfo)  
[YM2151 Noise Generator](#ym2151-noise-generator)

## YM2151 Address Map

All registers are write-only. Reads from any address will return a separate
status register. For more details, see:  
[X16 YM2151 Access](#x16-ym2151-access)
```
Offset      Bits                Content                                    
            |7 6 5 4 3 2 1 0|                                           
00h         |###############|   Not Used
01h         |     TEST      |   Test Registers
02h-07h     |###############|   Not Used
08h         |#| Slot  |Chan.|   Key On / Off
09h-0Eh     |###############|   Not Used
0Fh         |N|###|  NFRQ   |   Noise Enable / Frequency
10h         |     CLKA1     |   Timer A Reload
11h         |###########|A2 |   Timer A Reload
12h         |     CLKB      |   Timer B Reload
13h         |###############|   Not Used
14h         |C|#|RST|IRQ|LOD|   Timer Control
15h-17h     |###############|   Not Used
18h         |     LFRQ      |   LFO Frequency
19h         |    PMD/AMD    |   Phase / Amplitude Modulation Depth
1Ah         |###############|   Not Used
1Bh         |CT |#######| W |   Control Output / LFO Waveform
1Ch-1Fh     |###############|   Not Used
20h-27h     |R|L| FB  | CON |   Channel 0..7 Output / Feedback / Connection
28h-2Fh     |#|     KC      |   Channel 0..7 Key Code
30h-37h     |    KF     |###|   Channel 0..7 Key Fraction
38h-3Fh     |#| PMS |###|AMS|   Channel 0..7 Phase / AM Sensitivity
40h-5Fh     |#| DT1 |  MUL  |   Slot 0..31 Detune 1 / Phase Multiply
60h-7Fh     |#|     TL      |   Slot 0..31 Total Level
80h-9Fh     |KS |#|   AR    |   Slot 0..31 Key Scaling / Attack Rate
A0h-BFh     |A|###|   D1R   |   Slot 0..31 AMS Enable / Decay 1 Rate
C0h-DFh     |DT2|#|   D2R   |   Slot 0..31 Detune 2 / Decay 2 Rate
E0h-FFh     |  D1L  |  RR   |   Slot 0..31 Decay 1 Level / Release Rate
            |7 6 5 4 3 2 1 0|
```

## YM2151 Block Diagram

YM2151 is a sound synthesizer chip. It employs a phase modulation synthesis
(marketed as frequency modulation) where the output of a wave generator is
added to another wave generator's input phase. This can simply be implemented
as modifying the current wave table index. It provides flexible routing between
them with 8 connection presets, which some of them also has additive synthesis.
In addition of the main synthesizer core, it also provides a low-frequency
oscillator (LFO), a noise generator, interrupt timers and general-purpose
output/control pins.

### Overall Block Diagram
```
 ______________________         __________        CLKA,   Timer   | External
| LFO    _______   PMD |       | Channel  |       CLKB   Control  |
|       |  LFO  |   v  |LFO PM | 0..7     ||        |       |     |     To Amp.
| LFRQ->| Waves |->(x)-|------>| _______  ||CSM    _v_______v_    |     & Mixer
|       | Table |      |LFO AM || Slot  | ||Keyon |           |   |         ^
| W---->|_______|->(x)-|------>|| 0..31 |||<------|   Timer   |---|->/IRQ   |
|           ^       ^  |Noise  ||_______||||      |___________|   |         |
|           |      AMD |Source | |_______|||                      |         |
|           '----------|-------|__________|---. L/R Out    CT1,2--|->CT1,2  |
|______________________|        |__________|  |        _________  |   ______|_
                                           ___v____   | Encoder | |  | YM3012 |
                                          | Accum. |  | /Serial |-|->|  D/A   |
                                          | /Mixer |->| Shifter | |  |________|
Internal                                  |________|  |_________| | 
```

### Channel Block Diagram
```
           AMS           ______ 
            |       .-->| Slot |<-----------.
            |       |   |  M1  |            |
            |   .---|-->|______|------+--->(x)<---FB
            v   |   |    ______      _v______
[LFO AM]-->(x)--|---+-->| Slot |<---|        |              L
                |   |   |  C1  |    | Router |<---CON   .---:--->[L Output]
  KC, KF-->(+)--+---|-->|______|--->| /Mixer |          |
            ^   |   |    ______     |  (See  |          |
            |   |   +-->| Slot |<---|  Slot  |          |   R
[LFO PM]-->(x)  |   |   |  M2  |    | Con.s) |----------+---:--->[R Output]
            ^   +---|-->|______|--->|________|
            |   |   |    ______       |    ^
            |   |   '-->| Slot |<-----'    |
            |   |       |  C2  |           |
           PMS  '------>|______|-----------'
```

### Slot Block Diagram
```
DT2---.  [PM'd KC]               MUL         [Mod. Input]
  ____v__    |    _______         |    _______    |    _______
 |  DT2  |   v   | Freq. |        v   | Phase |   v   | Sine  |
 | Table |->(+)->| Table |->(+)->(x)->|  Gen. |->(+)->| Table |
 |_______|       |_______|   ^        |_______|       |_______|
                          ___|___                        |
KC, KF-------+---------->|  DT1  |                       v
             |           | Table |<----DT1   .--------->(+)
        _____v_____      |_______|           |           |
       | Envelope  |                         |    _______v______
Keyon->| Generator |->(+)->(+)---------------+   |  Att. dB To  |
       |___________|   ^    ^                |   | Linear Table |
AR, D1R,     ^         |    | AMS En.        |   |______________|
D1L, D2R,----'         |    '----:----[AMS]  |           |
RR, KS                 TL                    |           o
.............................................|............\
: Slot 31 Only            _______            |         NE :o-->[Output]
: (Ch.7 C2)              | Noise |           v            :
:              NFRQ----->|  Gen. |--------->(x)----------o:
:                        |_______|----->[Noise LFO Src.]  :
:.........................................................:
```

### Slot Connections (Algorithms)
CON = 0
```
      .-----------.  PG             PG             PG
      v    .----. |   v    .----.    v    .----.    v    .----.
PG-->(+)-->| M1 |-+->(+)-->| C1 |-->(+)-->| M2 |-->(+)-->| C2 |-->OUT
           '----'          '----'         '----'         '----'
```
CON = 1
```
      .-----------.  PG             PG
      v    .----. |   v    .----.    v    .----.
PG-->(+)-->| M1 |-+->(+)-->| M2 |-->(+)-->| C2 |-->OUT
           '----'     ^    '----'         '----'
           .----.     |
PG-------->| C1 |-----'
           '----'
```
CON = 2
```
      .-----------.
      v    .----. |
PG-->(+)-->| M1 |-+------------------.  PG
           '----'    PG              | /
           .----.     v    .----.    vL   .----.
PG-------->| C1 |----(+)-->| M2 |-->(+)-->| C2 |-->OUT
           '----'          '----'         '----'
```
CON = 3
```
      .-----------.  PG             PG
      v    .----. |   v    .----.    v    .----.
PG-->(+)-->| M1 |-+->(+)-->| C1 |-->(+)-->| C2 |-->OUT
           '----'          '----'    ^    '----'
                           .----.    |
PG------------------------>| M2 |----'
                           '----'
```
CON = 4
```
      .-----------.  PG
      v    .----. |   v    .----.
PG-->(+)-->| M1 |-+->(+)-->| C1 |-->(+)-->OUT
           '----'    PG    '----'    ^
           .----.     v    .----.    |
PG-------->| M2 |--->(+)-->| C2 |----'
           '----'          '----'
```
CON = 5
```
      .-----------.  PG
      v    .----. |   v    .----.
PG-->(+)-->| M1 |-+->(+)-->| C1 |-->(+)-->OUT
           '----' |  PG    '----'    ^
                  |   v    .----.    |
                  +->(+)-->| M2 |-->(+)
                  |  PG    '----'    ^
                  |   v    .----.    |
                  +->(+)-->| C2 |----'
                           '----'
```
CON = 6, CON = 7
```
      .-----------.  PG                                .-----------.
      v    .----. |   v    .----.                      v    .----. |
PG-->(+)-->| M1 |-+->(+)-->| C1 |-->(+)-->OUT    PG-->(+)-->| M1 |-+->(+)-->OUT
           '----'          '----'    ^                      '----'     ^
                           .----.    |                      .----.     |
PG------------------------>| M2 |-->(+)          PG-------->| C1 |--->(+)
                           '----'    ^                      '----'     ^
                           .----.    |                      .----.     |
PG------------------------>| C2 |----'           PG-------->| M2 |--->(+)
                           '----'                           '----'     ^
                                                            .----.     |
                                                 PG-------->| C2 |-----'
                                                            '----'
```

## YM2151 Control Registers

### 01h - Test Registers
```
Bit
7       Internal Data Byte Select (0=Lower, 1=Upper) (undocumented)
6       Internal Data Enable (0=Disable, 1=Enable) (undocumented)
5       Halt Envelope Generator (1=Halt) (undocumented)
4       Negate Output Data (0=Normal, 1=Negate) (undocumented)
3       Halt Phase Generator and LFO (1=Halt) (undocumented)
2       Manually Clock All Timers and LFO (undocumented)
1       Halt and Reset LFO (1=Halt)
0       Envelope Generator Speed (0=Normal, 1=Double) (undocumented)
```
As the name implies, this register is used for testing purposes. It is set to 0
on reset/startup and the software should never change it. Only bit 1 is
mentioned in the application manual as a way to reset LFO to the start of the
waveform by writing 1 then 0 to it.

Enabling internal data will replace the read status register with the following
value, the lower and upper 8 bits of this can be selected with bit 7:
```
Bit
15      Phase Generator Serial Data
14      Envelope Generator Serial Data
13-0    Current Processed Slot's Output Level
```

### 1Bh - Control Output
```
Bit
7       CT2, Output on Pin 9 (0=Low, 1=High)
6       CT1, Output on Pin 8 (0=Low, 1=High)
5-2     Not Used
1-0     LFO Waveform (see LFO section)
```
CT1 and CT2 outputs correspond to physical pins of the same name on the chip.
These are used for general-purpose output. For X16, those pins are not
connected to anything.

## YM2151 Timers

### 10h/11h - Timer A Reload
```
Bit
15-10   Not Used
9-8     Timer A Reload (lower 2 bits) (CLKA2)
7-0     Timer A Reload (upper 8 bits) (CLKA1)
```
Set Timer A reload value. Note that this is not a little endian integer, as the
upper byte defines the lower 2 bits, making the value `n = (CLKA1*4)+CLKA2`.
The overflow frequency is `clk/64/(1024-n)` Hz.

### 12h - Timer B Reload (CLKB)
Set Timer B reload value. All 8 bits are used. The overflow frequency is
`clk/1024/(256-CLKB)` Hz.

### 14h - Timer Control
```
Bit
7       CSM (0=Disable, 1=Enable)
6       Not Used
5       Timer B Overflow Reset (1=Reset)
4       Timer A Overflow Reset (1=Reset)
3       Timer B IRQ (0=Disable, 1=Enable)
2       Timer A IRQ (0=Disable, 1=Enable)
1       Timer B Start (0=Stop, 1=Start)
0       Timer A Start (0=Stop, 1=Start)
```
Starting a timer (changing from 0 to 1) will automatically load the reload
value to the counter. When CSM is enabled, every slots' envelope generator will
do a key-on every time Timer A overflows.

## YM2151 Channels and Slots

YM2151 has a total of 32 slots which independently has its own phase generator
and ADSR envelope generator. However, it groups each 4 of them into 8 channels
(giving the "4-op" terminology). Each channel has defined connections between
slots to output to a single channel output. Some of parameters such as main
frequency and connection is defined per-channel. The 4 slots in each channel
has a name given to each of them as functions (or operators). The assignment
for each slot is as follows:
```
Slot No.          0..7      |      8..15     |     16..23     |     24..31
Channel No. 0 1 2 3 4 5 6 7 |0 1 2 3 4 5 6 7 |0 1 2 3 4 5 6 7 |0 1 2 3 4 5 6 7
Function           M1       |       M2       |       C1       |       C2
```

### 20h..27h - Channel 0..7 Output / Feedback / Connection
```
Bit
7       Output to Right Channel
6       Output to Left Channel
5-3     M1 Self-feedback (FB) (0=No Feedback, 7=Max)
2-0     Slot Connection (CON) (0-7)
```
Self-feedback is done by taking M1's output, multiply with `pi*2^(FB-5)`, then
add it back with M1's input in the next sample. This will alter the waveform
as shown in a following example:
```
 .'.     .'.        FB=0, TL=0
/   \   /   \       No feedback, Sine wave output
     '.'     '.'    

'.      '.          FB=4, TL=0
  '-.     '-.       Filtered Saw wave output
     './     './    
  _       _
+/ +! \!+/ +! \!    FB=7, TL=0
!- !+ -+!- !+ -+    Overflow, Noise-like output
+\ +!_/!+\ +!_/!   
```

For details about slot connections, see:  
[YM2151 Block Diagram](#ym2151-block-diagram)  

## YM2151 Phase Generator

### 28h..2Fh - Channel 0..7 Key Code (KC)
```
Bit
7       Not Used
6-4     Octave
3-0     Note
```
Note means a 12-tone interval. The relation between bit 0-3 value and a key
code value is as follows:
```
0h=0/C# 4h=3/E  8h=6/G  Ch=9 /A#
1h=1/D  5h=4/F  9h=7/G# Dh=10/B
2h=2/D# 6h=5/F# Ah=8/A  Eh=11/C
3h=2/D# 7h=5/F# Bh=8/A  Fh=11/C ; In this row are invalid values, do not use
```
Every mentions of key code or KC in this document will be referred as a
continuous value after invalid "gaps" removal. Which means that its lower 3
bits can only be 0-11. Any calculations on the chip that modifies this value
will automatically adjust the result to be in a valid form, similar to how BCD
digits are handled.

### 30h..37h - Channel 0..7 Key Fraction
```
Bit
7-2     Key Fraction (KF); n*100/64 cents
1-0     Not Used
```
The entire register byte can be seen as an 8-bit fraction part of Note value
with lower 2 bits always being zero. This register and key code's value will
be used as an input to the phase generator of every mapped slots of this
channel.

### Frequency Register Notes

Since the chip internally works in linear phase steps but has note+cents
exponential frequency definition. It combines KF register and a Note value set
in KC register to produce an index to a lookup table. The lookup table has
phase step values in such a way that a Note value of 0 and a KF of 0 means
C# note + 0 cents, when the chip runs at 3579545Hz clock (which is luckily the
case for X16).

The output frequency can be calculated as `LUT[Note*64+KF]*(2^Octave)` Hz. And
the phase step can be calculated as `clk*n/2^26` Hz.

### 40h..5Fh - Slot 0..31 Detune 1 / Phase Multiply
```
Bit
7       Not Used
6       Detune 1 (DT1) Sign (0=Positive, 1=Negative)
5-4     Detune 1 (DT1) Amount (0-3)
3-0     Phase Multiply (MUL) (0=0.5x, 1=1x..15=15x)
```
Detune 1 values can be treated as a 3-bit sign-magnitude number. This will
apply a tiny change to the phase step in each slot's phase generator. Resulting
in a slight inharmonic, strings-like timbre to the voice. The amount to
add/subtract to the phase step also depends on the current Key Code value as
shown in the following table:
```
KC[6..2]    +/- Phase Step      +/- Cents (approx.)
OCT NOTE    0   1   2   3       0       1       2       3     DT1[1..0]
+-------------------------------------------------------------
 0  0-2     0   0   1   2       0.000   0.000   5.025  10.036
 0  3-5     0   0   1   2       0.000   0.000   4.225   8.440
 0  6-8     0   0   1   2       0.000   0.000   3.555   7.103
 0  9-11    0   0   1   2       0.000   0.000   2.989   5.972
 1  0-2     0   1   2   2       0.000   2.515   5.025   5.025
 1  3-5     0   1   2   3       0.000   2.114   4.225   6.334
 1  6-8     0   1   2   3       0.000   1.778   3.555   5.330
 1  9-11    0   1   2   3       0.000   1.495   2.989   4.481
 2  0-2     0   1   2   4       0.000   1.258   2.515   5.025
 2  3-5     0   1   3   4       0.000   1.057   3.170   4.225
 2  6-8     0   1   3   4       0.000   0.889   2.667   3.555
 2  9-11    0   1   3   5       0.000   0.748   2.242   3.735
 3  0-2     0   2   4   5       0.000   1.258   2.515   3.143
 3  3-5     0   2   4   6       0.000   1.057   2.114   3.170
 3  6-8     0   2   4   6       0.000   0.889   1.778   2.667
 3  9-11    0   2   5   7       0.000   0.748   1.869   2.615
 4  0-2     0   2   5   8       0.000   0.629   1.572   2.515
 4  3-5     0   3   6   8       0.000   0.793   1.586   2.114
 4  6-8     0   3   6   9       0.000   0.667   1.334   2.001
 4  9-11    0   3   7  10       0.000   0.561   1.308   1.869
 5  0-2     0   4   8  11       0.000   0.629   1.258   1.729
 5  3-5     0   4   8  12       0.000   0.529   1.057   1.586
 5  6-8     0   4   9  13       0.000   0.445   1.001   1.445
 5  9-11    0   5  10  14       0.000   0.467   0.935   1.308
 6  0-2     0   5  11  16       0.000   0.393   0.865   1.258
 6  3-5     0   6  12  17       0.000   0.397   0.793   1.123
 6  6-8     0   6  13  19       0.000   0.334   0.723   1.056
 6  9-11    0   7  14  20       0.000   0.327   0.654   0.935
 7  0-2     0   8  16  22       0.000   0.315   0.629   0.865
 7  3-5     0   8  16  22       0.000   0.264   0.529   0.727
 7  6-8     0   8  16  22       0.000   0.222   0.445   0.612
 7  9-11    0   8  16  22       0.000   0.187   0.374   0.514
```
NOTE: KC here is a Key Code value *after* LFO and DT2 adjustment. See Slot
Block Diagram section for more details.

Phase Multiply value will multiply the final phase step value by the specified
multiple. A value of 0 is special and means 0.5x instead of 0x. This puts the
slot's wave output in a different (sub-)harmonic compared to other slots of the
same channel.

### C0h..DFh - Slot 0..31 Detune 2
```
Bit
7-6     Detune 2 (DT2) (0-3)
5       Not Used
4-0     Decay 2 Rate (D2R) (see ADSR Envelope section)
```
Detune 2 will apply a substantial change to the *key code* in each slot's phase
generator. The amount to add/subtract to the key code are mostly inharmonic,
which is useful for certain sound effects and percussions, as shown in the
following table:
```
DT2     + KC;KF     + Cents     x Frequency
0       0;00        0           1.000
1       6;00        600         1.414
2       7;52        781         1.570
3       9;32        950         1.731
```

## YM2151 ADSR Envelope

YM2151's envelope can be summarized as follows:
```
 dB
  0 -|     ,|   |              |
     |    / |`. |              |
D1L -|   /  |  `|--            |
     |  /   |   |  ``--..      |
     | /    |   |        ``--..|
-96 -|/     |   |              |\
     |  AR   D1R      D2R      |RR
   Keyon                    Keyoff  Time->
```

### 08h - Key On / Off
```
Bit
7       Not Used
6       C2 Function Slot (0=Key Off, 1=Key On)
5       M2 Function Slot (0=Key Off, 1=Key On)
4       C1 Function Slot (0=Key Off, 1=Key On)
3       M1 Function Slot (0=Key Off, 1=Key On)
2-0     Channel Number (0-7)
```
Sends a Key On or a Key Off signal to each mapped slots of the specified
Channel Number. An off to on transition will reset the slot's Envelope
Generator state to Attack (but won't change the envelope value to lowest). And
an on to off transition will change it to Release. 

The mapping between each Channel Number/Function Slot combination and the
target Slot Number is as follows, in this register's perspective:
```
CH No. (Bit 2-0)       0       |       1       |       2       |       3
Reg. Bit         6   5   4   3 | 6   5   4   3 | 6   5   4   3 | 6   5   4   3
Function         C2  M2  C1  M1| C2  M2  C1  M1| C2  M2  C1  M1| C2  M2  C1  M1
Slot No.         24  8   16  0 | 25  9   17  1 | 26  10  18  2 | 27  11  19  3

CH No. (Bit 2-0)       4       |       5       |       6       |       7
Reg. Bit         6   5   4   3 | 6   5   4   3 | 6   5   4   3 | 6   5   4   3
Function         C2  M2  C1  M1| C2  M2  C1  M1| C2  M2  C1  M1| C2  M2  C1  M1
Slot No.         28  12  20  4 | 29  13  21  5 | 30  14  22  6 | 31  15  23  7
```

### 60h..7Fh - Slot 0..31 Total Level
```
Bit
7       Not Used
6-0     Total Level (TL) (0=Loudest, 127=Silent)
```
Total Level will apply an attenuation after the current envelope value is
determined, leaving the overall envelope duration unchanged. The value is in
0.75 dB steps from 0 to -95.25 dB

### 80h..9Fh - Slot 0..31 Key Scaling / Attack Rate
```
Bit
7-6     Key Scaling (KS) (0-3)
5       Not Used
4-0     Attack Rate (AR) (0=No Attack, 31=Fastest)
```
Key Scaling scales AR, D1R, D2R and RR rates according to the current key code
value. This is used to replicate some instruments that has faster envelope the
higher pitch it produces. If the rates are 0, KS is forced to be 0.

Attack Rate of 0 (no attack) means the envelope will never ramps up.

### A0h..BFh - Slot 0..31 Decay 1 Rate
```
Bit
7       AMS Enable (see LFO section)
6-5     Not Used
4-0     Decay 1 Rate (D1R) (0=No Decay, 31=Fastest)
```

### C0h..DFh - Slot 0..31 Decay 2 Rate
```
Bit
7-6     Detune 2 (DT2) (see Phase Generator section)
5       Not Used
4-0     Decay 2 Rate (D2R) (0=No Decay, 31=Fastest)
```

### E0h..FFh - Slot 0..31 Decay 1 Level / Release Rate
```
Bit
7-4     Decay 1 Level (D1L) (0-15)
3-0     Release Rate (RR) (0=No Release, 15=Fastest)
```
Decay 1 Level will set the point in the envelope generator to change from Decay
1 Rate to Decay 2 Rate once the envelope value changes past it during the decay
phase. The value is in 3 dB steps from 0 to -42 dB, D1L value of 15 is special
and means -93 dB. If D1L is 0, the envelope generator will immediately skip
Decay 1 phase even if D1R is 0.

### ADSR Rates
There are two categories of envelope rates, Attack Rate for AR and Decay Rate
for D1R, D2R and RR. The resulting internal rate value can be calculated as
`RATE = xR*2+(KC SHR (5-KS))` where xR is AR, D1R, D2R or RR\*2+1 value. If
RATE is greater than 63 then clamp it to 63. Actual envelope rates are defined
as follows (assuming 3579545Hz clock rate):
```
RATE  Attack Time Decay Time/Rate     | RATE  Attack Time Decay Time/Rate
      (-96..0 dB) (0..-96dB)          |       (-96..0 dB) (0..-96dB)
      ms          ms        dB/s      |       ms          ms        dB/s
0     Inf.        Inf.      0.00000   | 32    62.2201     878.806   109.239
1     Inf.        Inf.      0.00000   | 33    49.7761     703.045   136.548
2     Inf.        Inf.      0.00000   | 34    41.6231     585.871   163.858
3     Inf.        Inf.      0.00000   | 35    35.6156     502.175   191.168
4     7964.18     112487.   0.85343   | 36    31.1100     439.403   218.478
5     7964.18     112487.   0.85343   | 37    24.8880     351.522   273.097
6     5327.76     74991.5   1.28014   | 38    20.8115     292.935   327.717
7     5327.76     74991.5   1.28014   | 39    17.8078     251.087   382.336
8     3982.09     56243.6   1.70686   | 40    15.5550     219.701   436.956
9     3185.67     44994.9   2.13357   | 41    12.4440     175.761   546.195
10    2663.88     37495.7   2.56029   | 42    10.4057     146.467   655.434
11    2279.40     32139.2   2.98700   | 43    8.90392     125.543   764.673
12    1991.04     28121.8   3.41372   | 44    7.77752     109.850   873.912
13    1592.83     22497.4   4.26715   | 45    6.22201     87.8806   1092.39
14    1331.94     18747.8   5.12058   | 46    5.20289     73.2338   1310.86
15    1139.70     16069.6   5.97401   | 47    4.45196     62.7719   1529.34
16    995.523     14060.9   6.82744   | 48    3.91558     54.9254   1747.82
17    796.418     11248.7   8.53430   | 49    3.27192     43.9403   2184.78
18    665.970     9373.93   10.2411   | 50    2.78918     36.6169   2621.73
19    569.851     8034.80   11.9480   | 51    2.41371     31.3859   3058.69
20    497.761     7030.45   13.6548   | 52    2.14552     27.4627   3495.64
21    398.209     5624.36   17.0686   | 53    1.77005     21.9701   4369.56
22    332.985     4686.96   20.4823   | 54    1.50186     18.3084   5243.47
23    284.925     4017.40   23.8960   | 55    1.28731     15.6929   6117.38
24    248.880     3515.22   27.3097   | 56    1.12640     13.7313   6991.29
25    199.104     2812.18   34.1372   | 57    1.12640     10.9850   8739.12
26    166.492     2343.48   40.9646   | 58    0.75093     9.15423   10486.9
27    142.462     2008.70   47.7920   | 59    0.75093     7.84648   12234.7
28    124.440     1757.61   54.6195   | 60    0.53638     6.86567   13982.5
29    99.5523     1406.09   68.2744   | 61    0.53638     6.86567   13982.5
30    83.2463     1171.74   81.9292   | 62    0.00000     6.86567   13982.5
31    71.2313     1004.35   95.5841   | 63    0.00000     6.86567   13982.5
```
NOTE: Attack rate is not linear and can't be described in dB/s. Attack RATE of
62 and 63 are bugged in some circumstances which can make the envelope never
ramps up at all, due to an extra logic to skip the attack phase for those
values.

Hardware-wise they are implemented as one global counter with integer and
fraction parts. The bit length for each part (point) is interpreted based on
the RATE/4 value of each envelope. Each time the integer part is incremented,
look up the value to add/subtract based on the fraction part. For decay rates,
simply add the value to the envelope (envelope value is an attenuation from 0
dB). For attack rate, subtract it with `((env_value+1) * add_value) SHR 4`.

## YM2151 Low Frequency Oscillator (LFO)

### 18h - LFO Frequency (LFRQ)
This 8-bit value is represented as a floating point step value. The resulting
LFO frequency is `clk*(10h+LFRQ[0..4])/2^(36-LFRQ[4..7])` Hz.

### 19h - Phase / Amplitude Modulation Depth
```
Bit
7       Select (0=Amplitude (AMD), 1=Phase (PMD))
6-0     Depth (0-127)
```
Define a depth as a ratio of n/128 from the maximum depth used in the PM/AM
sensitivity table below.

### 1Bh - LFO Waveform
```
Bit
7-6     CTx Output (see Control Registers section)
5-2     Not Used
1-0     LFO Waveform (W)
          0 = Sawtooth
          1 = Square
          2 = Triangle
          3 = Noise
```
LFO waveforms are as shown below. Noise LFO value is sampled from the current
LFSR generator state.
```
Waveform    Phase Modulation        Amplitude Modulation

Sawtooth    +  .|    .|    .|       0     .|    .|    .|
(W=0)       0 ' |  .' |  .' |  .        .' |  .' |  .' |
            -   |.'   |.'   |.'     + .'   |.'   |.'   |
              __    __    __             __    __    __
Square      +   |  |  |  |  |  |    0   |  |  |  |  |  |
(W=1)       0   |  |  |  |  |  |        |  |  |  |  |  |
            -   |__|  |__|  |__|    + __|  |__|  |__|  |

Triangle    +  /\    /\    /\       0   /\    /\    /\  
(W=2)       0 /  \  /  \  /  \         /  \  /  \  /  \ 
            -     \/    \/    \/    + /    \/    \/    \

Noise       + \ ! / ! \ ! / ! \     0 \ ! / ! \ ! / ! \
(W=3)       0 - + - + - + - + -       - + - + - + - + -
            - / ! \ ! / ! \ ! /     + / ! \ ! / ! \ ! /
```

### 38h..3Fh - Channel 0..7 Phase / Amplitude Modulation Sensitivity
```
Bit
7       Not Used
6-4     Phase Modulation Sensitivity (PMS) (0-7)
3-2     Not Used
1-0     Amplitude Modulation Sensitivity (AMS) (0-3)
```
Phase modulation is applied to the key code and key fraction of the channel
before sending them to slots' input. The meaning of both PMS and AMS values
are as follows:
```
PM Sensitivity  0   1   2   3   4   5   6   7
Max. Mod. +/-   0   5   10  20  50  100 400 700 Cents
When PMD=128

AM Sensitivity  0       1       2       3
Max. Mod.       0       23.906  47.813  95.625  dB
When AMD=128
```

### A0h..BFh - Slot 0..31 AMS Enable
```
Bit
7       AMS Enable (0=Disable, 1=Enable)
6-5     Not Used
4-0     Decay 1 Rate (D1R) (see ADSR Envelope section)
```
When AMS is enabled, the slot will receive the AMS-adjusted amplitude
modulation from its mapped channel and apply it to the envelope generator
output. If AMS is disabled, it simply ignores the amplitude modulation.

## YM2151 Noise Generator

### 0Fh - Noise Enable / Frequency
```
Bit
7       Noise Enable (0=Disable, 1=Enable)
6-5     Not Used
4-0     Noise Frequency (0-31) ; clk/(31-n)/32 Hz (usually)
```
When a noise is enabled, Slot 31 (Channel 7 C2 function)'s output is replaced
with a noise generator output. The generator uses a 17-bit LFSR to generate a
a noise at a specified frequency then multiply the output bit with Slot 31's
current envelope generator value (with TL and AM applied). Note that the value
here is treated as a *linear* ratio instead of dB attenuation. A noise
frequency value of 31 is the same as 30.

# CPU 65C02 Microprocessor

### Overview
[CPU Registers and Flags](#cpu-registers-and-flags)  
[CPU Memory Addressing](#cpu-memory-addressing)  
[CPU Clock Cycles](#cpu-clock-cycles)  

### Instruction Set
[CPU Memory and Register Transfers](#cpu-memory-and-register-transfers)  
[CPU Arithmetic/Logical Operations](#cpu-arithmeticlogical-operations)  
[CPU Rotate and Shift Instructions](#cpu-rotate-and-shift-instructions)  
[CPU Jump and Control Instructions](#cpu-jump-and-control-instructions)  
[CPU Opcode Matrix](#cpu-opcode-matrix)  

## CPU Registers and Flags

The 65xx CPUs are equipped with not more than three general purpose registers
(A, X, Y). However, the limited number of registers is somewhat covered by
comfortable memory operations, especially addresses 0000h-00FFh (usually
referred as zeropage) may be used for relatively fast and complicated
operations, insofar one might say that the CPU has about 256 8-bit "registers"
in memory. For details, see:  
[CPU Memory Addressing](#cpu-memory-addressing)  

### Registers
```
Name    Bits    Explanation
A       8       Accumulator
X       8       Index Register X
Y       8       Index Register Y
S       8       Stack Pointer (see below)
PC      16      Program Counter
P       8       Processor Status Register (see below)
```

### Stack Pointer
The stack pointer is addressing 256 bytes of memory with values 00h-FFh
corresponding directly to the address 0100h-01FFh. Unlike most other CPUs,
which decrements the stack pointer first before storing a data, 65xx CPUs will
store a data first before decrementing the stack pointer. Which means that the
stack will point to the first free byte. So, when initializing stack to the
top, set S=(1)FFh rather than (2)00h.

### Processor Status Register (Flags)
```
Bit     Name    Explanation
7       N       Negative/Sign (0=Positive, 1=Negative)
6       V       Overflow      (0=No Overflow, 1=Overflow)
5       1       Unused
4       B       Break Flag    (0=IRQ/NMI, 1=BRK opcode)
3       D       Decimal Mode  (0=Normal, 1=BCD Mode for ADC/SBC opcodes)
2       I       IRQ Disable   (0=Enable, 1=Disable)
1       Z       Zero          (0=Nonzero, 1=Zero)
0       C       Carry         (0=No Carry, 1=Carry)
```

### Carry Flag (C)
CAUTION: When used for subtractions (SBC and CMP), the carry flag have an
opposite meaning compared to Z80 and x86 CPUs. It is *set* when the result is
above or equal. For all other instructions (ADC, ASL, LSR, ROL, ROR) it works
as normal.

### Zero Flag (Z), Negative/Sign Flag (N), Overflow Flag (V)
Those flags work like most other CPUs: Z is set when the result is zero, N is
set when the signed result is negative (bit 7 is set). V is set when an
addition/subtraction exceeds the maximum range for signed numbers (-128..+127).

### IRQ Disable Flag (I)
Disables IRQs when set. NMIs (non-maskable interrupts) and BRK instructions are
not affected and will still interrupt.

### Decimal Mode Flag (D)
When set, addition/subtraction will operate as if all numbers are in packed BCD
format (range 00h..99h) and automatically handles digit carrying of it. Unlike
older NMOS 6502s, decimal mode addition/subtraction takes one more cycle than
normal to make resulting flags correct.

### Break Flag (B)
The Break flag is intended to separate between IRQ and BRK which are both using
the same vector, (FFFEh). It cannot be accessed directly but can be checked by
examining the pushed value on the stack (by either PHP instruction or
automatically by the interrupt). BRK opcode always write 1 to the bit, IRQ/NMI
execution always write 0.

## CPU Memory Addressing

### Opcode Addressing Modes
```
Name                        Syntax
Implied                     -
Accumulator                 A
Immediate                   #nn
Zero Page                   nn
Zero Page Indirect          (nn)
Zero Page Indexed with X    nn,X
Zero Page Indexed with Y    nn,Y
Zero Page Indexed Indirect  (nn,X)
Zero Page Indirect Indexed  (nn),Y
Absolute                    nnnn
Absolute Indirect           (nnnn)
Absolute Indexed with X     nnnn,X
Absolute Indexed with Y     nnnn,Y
Absolute Indexed Indirect   (nnnn,X)
Stack                       -
PC Relative                 rr
Zero Page Relative          nn,rr
```

### Zero Page - nn nn,X nn,Y
Uses an 8-bit parameter (one byte) to address the first 256 bytes of memory at
0000h-00FFh (page 0). This limited range is enforced even for Indexed
addressing. For example, "C0h+60h" will access 0020h instead of 0120h.

### Absolute - nnnn nnnn+X nnnn+Y
Uses a 16-bit parameter (two bytes) to address the whole memory at 0000h-FFFFh.
Because of an additional parameter byte, this is a bit slower than Zero Page
accesses.

### Indirect - (nn) (nn+X) (nn),Y (nnnn) (nnnn,X)
Uses an 8/16-bit parameter that points to a 16bit parameter in page 0 memory.
Even though the CPU doesn't support 16bit registers (except for the program
counter), this (double-)indirect addressing allows to use variable 16-bit
pointers.

## CPU Clock Cycles

### Execution Legend
```
C   Opcode command
P   Opcode parameter (immediate or address)
A   Address cycles (on indirect addresses)
D   Data cycles
N   Internal cycles
S   Stack cycles
```
Additional cycles
```
n   Internal cycle, when branch is taken
x   Internal cycle, when branching crosses page boundaries
y   Internal cycle, when indexing across page boundaries or STA nnnn,X
    The CPU doesn't do a read at invalid address unlike older NMOS 6502s
    (it will read the last byte again instead)
```

### Implied or Immediate Operands
```
Addressing Mode             Cycles  Execution
Implied Opcodes             2       CN
WAI/STP (wait IRQ, stop)    3       CNN
#nn                         2       CP
```

### Memory Operands
```
Addressing Mode             Cycles  Execution
nn                          3       CPD
nn (RMW)                    5       CPDND
nn,X or nn,Y                4       CPND
nn,X (RMW)                  6       CPNDND
nnnn                        4       CPPD
nnnn (RMW)                  6       CPPDND
nnnn,X or nnnn,Y            4,5     CPPyD
nnnn,X (RMW)                6,7     CPPyDND
(nn)                        5       CPAAD
(nn,X)                      6       CPNAAD
(nn),Y                      5,6     CPAAyD
```

### Push/Pulls
```
Addressing Mode             Cycles  Execution
PHx                         3       CNS
PLx                         4       CNNS
```

### Branches
```
Addressing Mode             Cycles  Execution
BRA rr                      3,4     CPNx
Bxx rr                      2,3,4   CPnx
BBxn nn,rr                  5,6,7   CPDNPnx
JMP nnnn                    3       CPP
JSR nnnn                    6       CPPNSS
JMP (nnnn)                  6       CPPNDD
JMP (nnnn,X)                6       CPPNDD
RTS                         6       CNNSSN
RTI                         6       CNNSSS
Interrupt (IRQ, NMI, RES)   7       NNSSSDD
Interrupt (BRK)             7       CPSSSDD
```

## CPU Memory and Register Transfers

### Register to Register Transfer
```
Opcode      Flags Clks  Syntax      Effect
AA          n---z-  2   TAX         X=A
A8          n---z-  2   TAY         Y=A
BA          n---z-  2   TSX         X=S
8A          n---z-  2   TXA         A=X
9A          ------  2   TXS         S=X
98          n---z-  2   TYA         A=Y
```

### Load Register from Memory
```
Opcode      Flags Clks  Syntax      Effect
A9 nn       n---z-  2   LDA #nn     A=nn
A5 nn       n---z-  3   LDA nn      A=[nn]
B5 nn       n---z-  4   LDA nn,X    A=[nn+X]
AD nn nn    n---z-  4   LDA nnnn    A=[nnnn]
BD nn nn    n---z-  4*  LDA nnnn,X  A=[nnnn+X]
B9 nn nn    n---z-  4*  LDA nnnn,Y  A=[nnnn+Y]
A1 nn       n---z-  6   LDA (nn,X)  A=[WORD[nn+X]]
B1 nn       n---z-  5*  LDA (nn),Y  A=[WORD[nn]+Y]
B2 nn       n---z-  5   LDA (nn)    A=[WORD[nn]]
A2 nn       n---z-  2   LDX #nn     X=nn
A6 nn       n---z-  3   LDX nn      X=[nn]
B6 nn       n---z-  4   LDX nn,Y    X=[D+nn+Y]
AE nn nn    n---z-  4   LDX nnnn    X=[nnnn]
BE nn nn    n---z-  4*  LDX nnnn,Y  X=[nnnn+Y]
A0 nn       n---z-  2   LDY #nn     Y=nn
A4 nn       n---z-  3   LDY nn      Y=[nn]
B4 nn       n---z-  4   LDY nn,X    Y=[nn+X]
AC nn nn    n---z-  4   LDY nnnn    Y=[nnnn]
BC nn nn    n---z-  4*  LDY nnnn,X  Y=[nnnn+X]
```
<small>* Add one cycle if indexing crosses a page boundary</small>

### Store Register in Memory
```
Opcode      Flags Clks  Syntax      Effect
85 nn       ------  3   STA nn      [nn]=A
95 nn       ------  4   STA nn,X    [nn+X]=A
8D nn nn    ------  4   STA nnnn    [nnnn]=A
9D nn nn    ------  5   STA nnnn,X  [nnnn+X]=A
99 nn nn    ------  5   STA nnnn,Y  [nnnn+Y]=A
81 nn       ------  6   STA (nn,X)  [WORD[nn+X]]=A
91 nn       ------  6   STA (nn),Y  [WORD[nn]+Y]=A
92 nn       ------  5   STA (nn)    [WORD[nn]]=A
86 nn       ------  3   STX nn      [nn]=X
96 nn       ------  4   STX nn,Y    [nn+Y]=X
8E nn nn    ------  4   STX nnnn    [nnnn]=X
84 nn       ------  3   STY nn      [nn]=Y
94 nn       ------  4   STY nn,X    [nn+X]=Y
8C nn nn    ------  4   STY nnnn    [nnnn]=Y
64 nn       ------  3   STZ nn      [nn]=0
74 nn       ------  4   STZ nn,X    [nn+X]=0
9C nn nn    ------  4   STZ nnnn    [nnnn]=0
9E nn nn    ------  5   STZ nnnn,X  [nnnn+X]=0
```

### Push/Pull (Stack)
```
Opcode      Flags Clks  Syntax      Effect
48          ------  3   PHA         [S]=A, S=S-1
08          ------  3   PHP         [S]=P, S=S-1
DA          ------  3   PHX         [S]=X, S=S-1
5A          ------  3   PHY         [S]=Y, S=S-1
68          n---z-  4   PLA         S=S+1, A=[S]
28          nvdizc  4   PLP         S=S+1, P=[S]
FA          n---z-  4   PLX         S=S+1, X=[S]
7A          n---z-  4   PLY         S=S+1, Y=[S]
```
NOTE: PLP cannot modify the B Flag or the unused flag.

## CPU Arithmetic/Logical Operations

### ALU Opcodes
```
Base        Flags       Syntax      Operands        Function
00          n---z-      ORA op      <alu_types>     A=A OR op
20          n---z-      AND op      <alu_types>     A=A AND op
40          n---z-      EOR op      <alu_types>     A=A XOR op
60          nv--zc      ADC op      <alu_types>     A=A+C+op
C0          n---zc      CMP op      <alu_types>     A-op
E0          nv--zc      SBC op      <alu_types>     A=A+C-1-op
C0          n---zc      CPY op      <cpx_types>     Y-op
E0          n---zc      CPX op      <cpx_types>     X-op
```

### alu_types (Operands for OR,AND,XOR,ADC,SBC,CMP Opcodes)
```
Opcode            Clks^ Syntax      Effect
Base+09 nn          2   #nn         op=nn
Base+05 nn          3   nn          op=[nn]
Base+15 nn          4   nn,X        op=[nn+X]
Base+0D nn nn       4   nnnn        op=[nnnn]
Base+1D nn nn       4*  nnnn,X      op=[nnnn+X]
Base+19 nn nn       4*  nnnn,Y      op=[nnnn+Y]
Base+01 nn          6   (nn,X)      op=[WORD[nn+X]]
Base+11 nn          5*  (nn),Y      op=[WORD[nn]+Y]
Base+12 nn          5   (nn)        op=[WORD[nn]]
```
<small>* Add one cycle if indexing crosses a page boundary</small>  
<small>^ Add one cycle if decimal mode and the instruction is ADC or SBC</small>

### cpx_types (Operands for CMP Opcodes with X,Y Operand)
```
Opcode            Clks  Syntax      Effect
Base+00 nn          2   #nn         op=nn
Base+04 nn          3   nn          op=[nn]
Base+0C nn nn       4   nnnn        op=[nnnn]
```

### Bit Test
```
Opcode      Flags Clks  Syntax
24 nn       nv--z-  3   BIT nn
2C nn nn    nv--z-  4   BIT nnnn
34 nn       nv--z-  4   BIT nn,X
3C nn nn    nv--z-  4*  BIT nnnn,X
89 nn       ----z-  2   BIT #nn
```
<small>* Add one cycle if indexing crosses a page boundary</small>

Flags are set as follows: `Z=((A AND op)==0)`, `N=op.Bit(7)` and `V=op.Bit(6)`.
Note that N and V rely only on op's value instead of the result.

### Increment by one
```
Opcode      Flags Clks  Syntax      Effect
1A          n---z-  2   INC A       A=A+1
E6 nn       n---z-  5   INC nn      [nn]=[nn]+1
F6 nn       n---z-  6   INC nn,X    [nn+X]=[nn+X]+1
EE nn nn    n---z-  6   INC nnnn    [nnnn]=[nnnn]+1
FE nn nn    n---z-  7   INC nnnn,X  [nnnn+X]=[nnnn+X]+1
E8          n---z-  2   INX         X=X+1
C8          n---z-  2   INY         Y=Y+1
```

### Decrement by one
```
Opcode      Flags Clks  Syntax      Effect
3A          n---z-  2   DEC A       A=A-1
C6 nn       n---z-  5   DEC nn      [nn]=[nn]-1
D6 nn       n---z-  6   DEC nn,X    [nn+X]=[nn+X]-1
CE nn nn    n---z-  6   DEC nnnn    [nnnn]=[nnnn]-1
DE nn nn    n---z-  7   DEC nnnn,X  [nnnn+X]=[nnnn+X]-1
CA          n---z-  2   DEX         X=X-1
88          n---z-  2   DEY         Y=Y-1
```

### TSB/TRB (Test and Set/Reset)
```
Opcode      Flags Clks  Syntax      Effect
04 nn       ----z-  5   TSB nn      z=(A AND [nn])==0,  [nn]=[nn] OR A
0C nn nn    ----z-  6   TSB nnnn    z=(A AND [nnnn])==0,[nnnn]=[nnnn] OR A
14 nn       ----z-  5   TRB nn      z=(A AND [nn])==0,  [nn]=[nn] AND NOT A
1C nn nn    ----z-  6   TRB nnnn    z=(A AND [nnnn])==0,[nnnn]=[nnnn] AND NOT A
```

### Bit Set/Reset
NOTE: These instructions are incompatible with 65C816
```
Opcode      Flags Clks  Syntax      Effect
x7+00       ------  5   RMBx nn     [nn].bit_x=0
x7+80       ------  5   SMBx nn     [nn].bit_x=1
```

## CPU Rotate and Shift Instructions
In effect column, c means input carry flag, c' means resulting carry flag.
-> and <- does a shift-in/out by 1 bit.

### Logical/Arithmetic Shift Left
```
Opcode      Flags Clks  Syntax      Effect
0A          n---zc  2   ASL A       c'<-A<-0
06 nn       n---zc  5   ASL nn      c'<-[nn]<-0
16 nn       n---zc  6   ASL nn,X    c'<-[nn+X]<-0
0E nn nn    n---zc  6   ASL nnnn    c'<-[nnnn]<-0
1E nn nn    n---zc  7   ASL nnnn,X  c'<-[nnnn+X]<-0
```

### Logical Shift Right
```
Opcode      Flags Clks  Syntax      Effect
4A          0---zc  2   LSR A       0->A->c'
46 nn       0---zc  5   LSR nn      0->[nn]->c'
56 nn       0---zc  6   LSR nn,X    0->[nn+X]->c'
4E nn nn    0---zc  6   LSR nnnn    0->[nnnn]->c'
5E nn nn    0---zc  7   LSR nnnn,X  0->[nnnn+X]->c'
```

### Rotate Left through Carry
```
Opcode      Flags Clks  Syntax      Effect
2A          n---zc  2   ROL A       c'<-A<-c
26 nn       n---zc  5   ROL nn      c'<-[nn]<-c
36 nn       n---zc  6   ROL nn,X    c'<-[nn+X]<-c
2E nn nn    n---zc  6   ROL nnnn    c'<-[nnnn]<-c
3E nn nn    n---zc  7   ROL nnnn,X  c'<-[nnnn+X]<-c
```

### Rotate Right through Carry
```
Opcode      Flags Clks  Syntax      Effect
6A          n---zc  2   ROR A       c->A->c'
66 nn       n---zc  5   ROR nn      c->[nn]->c'
76 nn       n---zc  6   ROR nn,X    c->[nn+X]->c'
6E nn nn    n---zc  6   ROR nnnn    c->[nnnn]->c'
7E nn nn    n---zc  7   ROR nnnn,X  c->[nnnn+X]->c'
```

NOTE: ROL and ROR rotate an 8-bit value through carry (9 bits in total).


## CPU Jump and Control Instructions

### Normal Jumps
```
Opcode      Flags Clks  Syntax          Effect
80 rr       ------  3   BRA rr          PC=PC+/-rr
4C nn nn    ------  3   JMP nnnn        PC=nnnn
6C nn nn    ------  6   JMP (nnnn)      PC=WORD[nnnn]
7C nn nn    ------  6   JMP (nnnn,X)    PC=WORD[nnnn+X]
20 nn nn    ------  6   JSR nnnn        [S]=PC+2, PC=nnnn, S=S+2
40          nvdizc  6   RTI             P=[S+1], PC=[S+2], S=S+3
60          ------  6   RTS             PC=[S+1]+1, S=S+2
```
Note: RTI cannot modify the B Flag or the unused flag. The 65C02 doesn't have
`JMP (nnnn)` operand crossing page boundaries bug found in older NMOS 6502s
(although it spends one more cycle).

### Conditional Branches (Branch on condition to PC+/-rr)
```
Opcode      Flags Clks  Syntax      Condition (branch if)
10 dd       ------  2** BPL rr      N=0 (positive)
30 dd       ------  2** BMI rr      N=1 (negative)
50 dd       ------  2** BVC rr      V=0 (no overflow)
70 dd       ------  2** BVS rr      V=1 (overflow)
90 dd       ------  2** BCC rr      C=0 (no carry/less than)
B0 dd       ------  2** BCS rr      C=1 (carry/greater then/equal)
D0 dd       ------  2** BNE rr      Z=0 (not zero/not equal)
F0 dd       ------  2** BEQ rr      Z=1 (zero/equal)
xF+00 nn rr ------  5** BBRx nn,rr^ [nn].bit_x=0
xF+80 nn rr ------  5** BBSx nn,rr^ [nn].bit_x=1
```
<small>^ These instructions are incompatible with 65C816</small>  
<small>** If the condition is false (no branch executed). Otherwise, add one
cycle. If the destination is in the same memory page, or add one cycle if it
crosses a page boundary (see below for exact info).</small>

NOTE: After subtractions (SBC or CMP), carry is set when the result is above
or equal, unlike as in Z80 and x86 CPUs.

### Interrupts, Breakpoints
```
Opcode    Clks  Syntax  Effect
00          7   BRK     B=1, [S]=PC+2,[S-2]=P, S=S-3, D=0 I=1, PC=[00FFFE]
-           7   /IRQ    B=0, [S]=PC,  [S-2]=P, S=S-3, D=0 I=1, PC=[00FFFE]
-           7   /NMI    B=0, [S]=PC,  [S-2]=P, S=S-3, D=0 I=1, PC=[00FFFA]
-           7   /RESET  B=1                           D=0 I=1, PC=[00FFFC]
```
IRQs can be disabled by setting the I flag. BRK, NMI, and /RESET signal cannot
be masked by setting I.

Interrupts first change the B flag, then write PC and P to the stack, and then
set the I flag. The D flag is cleared and BRK will not be ignored if IRQ
happens right after a fetch of that instruction, unlike in older NMOS 6502s.

The same vector is shared for BRK and IRQ. Software can separate between those
by examining the pushed B flag in the stack.

The RTI opcode can be used to return from BRK/IRQ/NMI. Note that returning from
BRK will skip one signature byte following after the BRK opcode.

IRQs are executed whenever /IRQ signal goes low and I flag is set to 0. NMIs
are executed whenever /NMI signal goes from high to low. If /IRQ signal is kept
low then the same interrupt is executed again as soon as I flag is set to 0. If
/NMI signal is kept LOW then no further NMIs can be executed. Software or
hardware must take care to acknowledge or reset /IRQ or /NMI signals after
processing it.

### CPU Control
```
Opcode      Flags Clks  Syntax      Effect
18          -----0  2   CLC         C=0     ; Clear carry flag
58          ---0--  2   CLI         I=0     ; Clear interrupt disable bit
D8          --0---  2   CLD         D=0     ; Clear decimal mode
B8          -0----  2   CLV         V=0     ; Clear overflow flag
38          -----1  2   SEC         C=1     ; Set carry flag
78          ---1--  2   SEI         I=1     ; Set interrupt disable bit
F8          --1---  2   SED         D=1     ; Set decimal mode
```

### Special Opcodes
```
Opcode      Flags Clks  Syntax      Effect
CB          ------  3x  WAI         HALT
DB          ------  -   STP         STOP
EA          ------  2   NOP         No operation
```
WAI halts the CPU until an IRQ/NMI/Reset occurs. In case of IRQs, this works
even if IRQs are disabled (I flag is set to 1). STP will stop the entire
processor's operation until a hardware Reset occurs.

Any other opcodes not mentioned throughout this chapter are invalid and
executed as NOPs. Those later become new opcodes in 65C816.

### Conditional Branch Page Crossing
The branch opcode with parameter takes up two bytes (or three bytes in case of
BBSx and BBRx), causing the PC to get incremented past it without any extra
boundary cycle. If a branch is taken, the signed parameter is then added to the
PC (PC+rr). The extra clock cycle occurs if the addition crosses page
boundaries.

### Dummy Read Cycles in Read-Modify Opcodes
The 65C02 does a read twice in all Read-Modify opcodes (such as INC, DEC and
Shift/Rotate). Unlike older NMOS 6502s which does a read then a write of
unmodified data, causing I/Os to act twice on writes.

## CPU Opcode Matrix
```
   |x0h|x1h|x2h|x3h|x4h|x5h|x6h|x7h |x8h|x9h|xAh|xBh|xCh|xDh|xEh|xFh |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |BRK|ORA|   |   |TSB|ORA|ASL|RMB0|PHP|ORA|ASL|   |TSB|ORA|ASL|BBR0|
0xh|brk|(zx|   |   | z | z | z | z  |stk| # | A |   | a | a | a | z  |
   |1 7|2 6|   |   |2 5|2 3|2 5|2 5 |1 3|2 2|1 2|   |3 6|3 4|3 6|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |BPL|ORA|ORA|   |TRB|ORA|ASL|RMB1|CLC|ORA|INC|   |TRB|ORA|ASL|BBR1|
1xh|rel|(zy|(z)|   | z |z,x|z,x| z  |imp|a,y| A |   | a |a,x|a,x| z  |
   |2 2|2 5|2 5|   |2 5|2 4|2 6|2 5 |1 2|3 4|1 2|   |3 6|3 4|3 7|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |JSR|AND|   |   |BIT|AND|ROL|RMB2|PLP|AND|ROL|   |BIT|AND|ROL|BBR2|
2xh|abs|(zx|   |   | z | z | z | z  |stk| # | A |   | a | a | a | z  |
   |3 3|2 6|   |   |2 3|2 3|2 5|2 5 |1 4|2 2|1 2|   |3 4|3 4|3 6|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |BMI|AND|AND|   |BIT|AND|ROL|RMB3|SEC|AND|DEC|   |BIT|AND|ROL|BBR3|
3xh|rel|(zy|(z)|   |z,x|z,x|z,x| z  |imp|a,y| A |   |a,x|a,x|a,x| z  |
   |2 2|2 5|2 5|   |2 4|2 4|2 6|2 5 |1 2|3 4|1 2|   |3 4|3 4|3 7|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |RTI|EOR|   |   |   |EOR|LSR|RMB4|PHA|EOR|LSR|   |JMP|EOR|LSR|BBR4|
4xh|stk|(zx|   |   |   | z | z | z  |stk| # | A |   | a | a | a | z  |
   |2 6|2 6|   |   |   |2 3|2 5|2 5 |1 3|2 2|1 2|   |3 3|3 4|3 6|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |BVC|EOR|EOR|   |   |EOR|LSR|RMB5|CLI|EOR|PHY|   |   |EOR|LSR|BBR5|
5xh|rel|(zy|(z)|   |   |z,x|z,x| z  |imp|a,y|stk|   |   |a,x|a,x| z  |
   |2 2|2 5|2 5|   |   |2 3|2 6|2 5 |1 2|3 4|1 3|   |   |3 4|3 7|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |RTS|ADC|   |   |STZ|ADC|ROR|RMB6|PLA|ADC|ROR|   |JMP|ADC|ROR|BBR6|
6xh|stk|(zx|   |   | z | z | z | z  |stk| # | A |   |(a)| a | a | z  |
   |2 6|2 6|   |   |2 3|2 4|2 5|2 5 |1 4|2 2|1 2|   |3 6|3 4|3 6|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |BVS|ADC|ADC|   |STZ|ADC|ROR|RMB7|SEI|ADC|PLY|   |JMP|ADC|ROR|BBR7|
7xh|rel|(zy|(z)|   |z,x|z,x|z,x| z  |imp|a,y|stk|   |(ax|a,x|a,x| z  |
   |2 2|2 5|2 5|   |2 4|2 3|2 6|2 5 |1 2|3 4|1 4|   |3 6|3 4|3 7|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |BRA|STA|   |   |STY|STA|STX|SMB0|DEY|STA|TXA|   |STY|STA|STX|BBS0|
8xh|rel|(zx|   |   | z | z | z | z  |imp| # |imp|   | a | a | a | z  |
   |2 2|2 6|   |   |2 3|2 3|2 3|2 5 |1 2|2 2|1 2|   |3 4|3 4|3 4|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |BCC|STA|STA|   |STY|STA|STX|SMB1|TYA|STA|TXS|   |STZ|STA|STX|BBS1|
9xh|rel|(zy|(z)|   |z,x|z,x|z,y| z  |imp|a,y|imp|   | a |a,x|a,y| z  |
   |2 2|2 5|2 5|   |2 4|2 4|2 4|2 5 |1 2|3 5|1 2|   |3 4|3 5|3 5|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |LDY|LDA|LDX|   |LDY|LDA|LDX|SMB2|TAY|LDA|TAX|   |LDY|LDA|LDX|BBS2|
Axh| # |(zx| # |   | z | z | z | z  |imp| # |imp|   | a | a | a | z  |
   |2 2|2 6|2 2|   |2 3|2 3|2 3|2 5 |1 2|2 2|1 2|   |3 4|3 4|3 4|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |BCS|LDA|LDA|   |LDY|LDA|LDX|SMB3|CLV|LDA|TSX|   |LDY|LDA|LDX|BBS3|
Bxh|rel|(zy|(z)|   |z,x|z,x|z,y| z  |imp|a,y|imp|   |a,x|a,x|a,y| z  |
   |2 2|2 5|2 5|   |2 4|2 4|2 4|2 5 |1 2|3 4|1 2|   |3 4|3 4|3 4|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |CPY|CMP|   |   |CPY|CMP|DEC|SMB4|INY|CMP|DEX|WAI|CPY|CMP|DEC|BBS4|
Cxh| # |(zx|   |   | z | z | z | z  |imp| # |imp|imp| a | a | a | z  |
   |2 2|2 6|   |   |2 3|2 3|2 5|2 5 |1 2|2 2|1 2|1 3|3 4|3 4|3 6|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |BNE|CMP|CMP|   |   |CMP|DEC|SMB5|CLD|CMP|PHX|STP|   |CMP|DEC|BBS5|
Dxh|rel|(zy|(z)|   |   |z,x|z,x| z  |imp|a,y|stk|imp|   |a,x|a,x| z  |
   |2 2|2 5|2 5|   |   |2 4|2 6|2 5 |1 2|3 4|1 3|1 -|   |3 4|3 7|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |CPX|SBC|   |   |CPX|SBC|INC|SMB6|INX|SBC|NOP|   |CPX|SBC|INC|BBS6|
Exh| # |(zx|   |   | z | z | z | z  |imp| # |imp|   | a | a | a | z  |
   |2 2|2 6|   |   |2 3|2 3|2 5|2 5 |1 2|2 2|1 2|   |3 4|3 4|3 6|2 5 |
+--|---|---|---|---|---|---|---|----|---|---|---|---|---|---|---|----|
   |BEQ|SBC|SBC|   |   |SBC|INC|SMB7|SED|SBC|PLX|   |   |SBC|INC|BBS7|
Fxh|rel|(zy|(z)|   |   |z,x|z,x| z  |imp|a,y|stk|   |   |a,x|a,x| z  |
   |2 2|2 5|2 5|   |   |2 4|2 6|2 5 |1 2|3 4|1 4|   |   |3 4|3 7|2 5 |
+---------------------------------------------------------------------
```


# About/Credits

### About

This document is written as an alternative to the official reference and aims
to document Commander X16 hardware in detail as much as possible. While still
being easy to follow in programmer's perspective. There are still lots of
missing and uncomfirmed details based on speculation and emulator source codes
(marked by (?)). Keep in mind that the hardware is currently in development and
it (and this specs too) can change anytime!

This document is released under
[CC-BY-4.0 license](https://creativecommons.org/licenses/by/4.0/). Everyone is
welcome to contribute, add missing bits and provide feedbacks through the
website repository linked below.

### Authors
Natt Akuma

### Credits
 - Michael Steil (official X16 programmer's reference and serial bus articles)
 - Frank van den Hoef (official VERA source code and programmer's reference)
 - Martin Korth (nocash) (SNES/65xx CPU reference)
 - Aaron Giles, Nuke.YKT (YM2151 core and test register details)
 - Adam Chapweske (PS/2 interface articles)
 - Jonathan Burks (Wavicle) (X16-compatible board tests)
 - Kevin Williams (TexElec) (X16 Developer Board schematics)

### Homepage
https://ayce.dev/emptyx16.html - X16 specs updates (html version)  
https://ayce.dev/emptyx16.txt - X16 specs updates (text version)  
https://github.com/AYCEdemo/emptyx16 - X16 specs repository  
