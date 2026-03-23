// Charles Lim Jun Wei, A0277527R
const { test, expect } = require('@playwright/test');

const jwt = require('jsonwebtoken');
const TOKEN = jwt.sign({ _id: '507f1f77bcf86cd799439011' });

const mockAuth = {
    user: {
        _id: 'u1',
        name: 'Test User',
        email: 'test@example.com',
        phone: '123456789',
        address: 'Test Address',
        role: 0,
    },
    token: TOKEN,
};

test.describe('Orders Page', () => {
    // Charles Lim Jun Wei, A0277527R
    test.beforeEach(async ({ page }) => {
        await page.addInitScript((auth) => {
            localStorage.setItem('auth', JSON.stringify(auth));
        }, mockAuth);

        await page.goto('/dashboard/user/orders');
    });
    // Charles Lim Jun Wei, A0277527R
    test('Loads the Orders page and shows the main heading', async ({ page }) => {
        await expect(
            page.getByRole('heading', { name: /all orders/i })
        ).toBeVisible();
    });
    // Charles Lim Jun Wei, A0277527R
    test('Displays order summary information for existing orders', async ({ page }) => {
        const orderSections = page.locator('.border.shadow');
        await expect(orderSections.first()).toBeVisible();

        const firstOrder = orderSections.nth(0);
        await expect(firstOrder).toContainText(/Processing|Delivered|Shipped|Cancelled|Not Process/i);
        await expect(firstOrder).toContainText('Test User');
        await expect(firstOrder).toContainText(/Success|Failed/i);

        const summaryTables = page.locator('table tbody tr');
        await expect(summaryTables.first()).toBeVisible();
    });
    // Charles Lim Jun Wei, A0277527R
    test('Renders ordered product entries with names, descriptions, and prices', async ({ page }) => {
        const productRows = page.locator('.card.flex-row');
        await expect(productRows.first()).toBeVisible();

        const rowCount = await productRows.count();
        expect(rowCount).toBeGreaterThan(0);

        for (let i = 0; i < rowCount; i++) {
            const currentRow = productRows.nth(i);

            await expect(currentRow.locator('p').first()).toBeVisible();
            await expect(currentRow.locator('p').nth(1)).toBeVisible();
            await expect(currentRow.getByText(/Price\s*:/i)).toBeVisible();
        }
    });
    // Charles Lim Jun Wei, A0277527R
    test('Displays product images for ordered items', async ({ page }) => {
        const productImages = page.locator('img.card-img-top');
        await expect(productImages.first()).toBeVisible();

        const imageCount = await productImages.count();
        expect(imageCount).toBeGreaterThan(0);

        for (let i = 0; i < imageCount; i++) {
            await expect(productImages.nth(i)).toHaveAttribute(
                'src',
                /\/api\/v1\/product\/product-photo\//
            );
        }
    });
    // Charles Lim Jun Wei, A0277527R
    test('Shows relative order timestamps', async ({ page }) => {
        await expect(page.getByText(/ago|seconds|minutes|hours|days/i).first()).toBeVisible();
    });
    // Charles Lim Jun Wei, A0277527R
    test('Shows one summary row per order', async ({ page }) => {
        const orderSummaryRows = page.locator('table tbody tr');
        const rowCount = await orderSummaryRows.count();

        expect(rowCount).toBeGreaterThan(0);
    });
});
