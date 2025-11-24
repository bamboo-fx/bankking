const { execSync } = require('child_process');

// Install platform-specific native binaries if missing
const platform = process.platform;
const arch = process.arch;

// Tailwind CSS Oxide binaries
if (platform === 'linux' && arch === 'x64') {
  // Vercel build environment
  try {
    require('@tailwindcss/oxide-linux-x64-gnu');
    console.log('✓ @tailwindcss/oxide-linux-x64-gnu is already installed');
  } catch (e) {
    console.log('Installing @tailwindcss/oxide-linux-x64-gnu for Linux x64...');
    try {
      execSync('npm install @tailwindcss/oxide-linux-x64-gnu@4.1.17 --no-save --legacy-peer-deps', {
        stdio: 'inherit'
      });
      console.log('✓ Successfully installed @tailwindcss/oxide-linux-x64-gnu');
    } catch (installError) {
      console.error('⚠ Failed to install @tailwindcss/oxide-linux-x64-gnu:', installError.message);
    }
  }
} else if (platform === 'darwin' && arch === 'arm64') {
  // macOS M1/M2
  try {
    require('@tailwindcss/oxide-darwin-arm64');
    console.log('✓ @tailwindcss/oxide-darwin-arm64 is already installed');
  } catch (e) {
    console.log('Installing @tailwindcss/oxide-darwin-arm64 for macOS ARM64...');
    try {
      execSync('npm install @tailwindcss/oxide-darwin-arm64@4.1.17 --no-save --legacy-peer-deps', {
        stdio: 'inherit'
      });
      console.log('✓ Successfully installed @tailwindcss/oxide-darwin-arm64');
    } catch (installError) {
      console.error('⚠ Failed to install @tailwindcss/oxide-darwin-arm64:', installError.message);
    }
  }
}

// LightningCSS binaries
if (platform === 'linux' && arch === 'x64') {
  // Vercel build environment
  try {
    require('lightningcss-linux-x64-gnu');
    console.log('✓ lightningcss-linux-x64-gnu is already installed');
  } catch (e) {
    console.log('Installing lightningcss-linux-x64-gnu for Linux x64...');
    try {
      execSync('npm install lightningcss-linux-x64-gnu@1.30.2 --no-save --legacy-peer-deps', {
        stdio: 'inherit'
      });
      console.log('✓ Successfully installed lightningcss-linux-x64-gnu');
    } catch (installError) {
      console.error('⚠ Failed to install lightningcss-linux-x64-gnu:', installError.message);
    }
  }
} else if (platform === 'darwin' && arch === 'arm64') {
  // macOS M1/M2
  try {
    require('lightningcss-darwin-arm64');
    console.log('✓ lightningcss-darwin-arm64 is already installed');
  } catch (e) {
    console.log('Installing lightningcss-darwin-arm64 for macOS ARM64...');
    try {
      execSync('npm install lightningcss-darwin-arm64@1.30.2 --no-save --legacy-peer-deps', {
        stdio: 'inherit'
      });
      console.log('✓ Successfully installed lightningcss-darwin-arm64');
    } catch (installError) {
      console.error('⚠ Failed to install lightningcss-darwin-arm64:', installError.message);
    }
  }
}

