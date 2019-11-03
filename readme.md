Goal: Render SVDAG in browser.
Problem: samplerbuffer not supported, needs to be texture3d, which is implemented for ssvdag
OK, then we do it for the ESVDAG - strip out mirror stuff

No, that won't work - no 64 bit sampler buffer or texture type available.
Easiest would be to do conventional SVDAG with 32 bit texture
